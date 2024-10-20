import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type SignInResponse, type User } from '../interfaces';
import { SignInAction } from '../actions';
import { useStorage } from '@vueuse/core';
import { RegisterAction } from '../actions/register.action';
import { checkAuthAction } from '../actions/check-auth.action';
import type { RegisterRequest } from '../interfaces/register.request';

export const useAuthStore = defineStore('AuthStore', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useStorage('token', ''));

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

  const register = async (registerRequest: RegisterRequest) => {
    try {
      const response = await RegisterAction(registerRequest);

      if (!response.success) {
        logout();
        errorMessage.value = response.message;
        return false;
      }
      const registerResponse: SignInResponse = response.data;
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
      const response = await checkAuthAction();

      if (!response.success) {
        logout();
        return false;
      }

      const checkAuthResponse: SignInResponse = response.data;
      authStatus.value = AuthStatus.Authenticated;
      user.value = checkAuthResponse.user;
      token.value = checkAuthResponse.token;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  }

  const setErrorMessage = (message: string) => {
    errorMessage.value = message;
  }

  return {
    user,
    token,
    authStatus,
    errorMessage,

    //Getter
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isUnauthenticated: computed(() => authStatus.value === AuthStatus.Unauthenticated),
    isAdmin: computed(()=> user.value?.role === 'admin'),
    //TODO: getter para saber si es Admin o no
    //username: computed(() => user.value?.fullName),

    //Actions
    signIn,
    logout,
    register,
    checkAuthStatus,
    setErrorMessage
  };
});
