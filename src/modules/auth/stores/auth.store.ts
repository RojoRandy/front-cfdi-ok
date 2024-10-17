import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type SignInResponse, type User } from '../interfaces';
import { SignInAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
import { RegisterAction } from '../actions/register.action';

export const useAuthStore = defineStore('AuthStore', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const errorMessage = ref('');

  const signIn = async (email: string, password: string) => {
    try {
      const response = await SignInAction(email, password);

      if (!response.success) {
        logout();
        errorMessage.value = response.message;
        return false;
      }

      const signInResponse: SignInResponse = response.data;

      user.value = signInResponse.user;
      token.value = signInResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return response;
    } catch (error) {
      logout();
      errorMessage.value = 'No se pudo realizar la petición, por favor intente de nuevo';
      return false;
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return true;
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await RegisterAction(fullName, email, password);

      if (!registerResponse.ok) {
        logout();
        return false;
      }

      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        logout();
        return false;
      }

      authStatus.value = AuthStatus.Authenticated;
      user.value = statusResp.user;
      token.value = statusResp.token;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  }

  return {
    user,
    token,
    authStatus,
    errorMessage,

    //Getter
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuhtenticated: computed(() => authStatus.value === AuthStatus.Checking),
    //TODO: getter para saber si es Admin o no
    //username: computed(() => user.value?.fullName),

    //Actions
    signIn,
    logout,
    register,
  };
});
