import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type SignInResponse, type User } from '../interfaces';
import { SignInAction } from '../actions';
import { RegisterAction } from '../actions/register.action';
import { checkAuthAction } from '../actions/check-auth.action';
import type { RegisterRequest } from '../interfaces/register.request';
import { useLocalStorage } from '@vueuse/core';
import type { ResponseDto } from '@/modules/common/interfaces/api-schema-response';

export const useAuthStore = defineStore('AuthStore', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const signIn = async (email: string, password: string): Promise<ResponseDto> => {
    try {
      const response = await SignInAction(email, password);

      if (!response.success) {
        logout();
        return {
          success: false,
          message: response.message
        };
      }

      const signInResponse: SignInResponse = response.data;

      user.value = signInResponse.user;
      token.value = signInResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return response;
    } catch (error) {
      logout();
      return {
        success: false,
        message: 'No se pudo realizar la petición, por favor intente de nuevo'
      };
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return true;
  };

  const register = async (registerRequest: RegisterRequest): Promise<ResponseDto> => {
    try {
      const response = await RegisterAction(registerRequest);

      if (!response.success) {
        logout();
        return {
          success: false,
          message: response.message
        };
      }
      const registerResponse: SignInResponse = response.data;
      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return response;
    } catch (error) {
      logout();
      return {
        success: false,
        message: 'No se pudo realizar la petición, por favor intente de nuevo'
      };
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

  return {
    user,
    token,
    authStatus,

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
    checkAuthStatus
  };
});
