import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { LoginAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';
import { RegisterAction } from '../actions/register.action';

export const useAuthStore = defineStore('AuthStore', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await LoginAction(email, password);

      if (!loginResponse.ok) {
        logout();
        return false;
      }

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.Unauthenticated;
    user.value = undefined;
    token.value = '';
    return true;
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
  ) => {
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

  return {
    user,
    token,
    authStatus,

    //Getter
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuhtenticated: computed(() => authStatus.value === AuthStatus.Checking),
    //TODO: getter para saber si es Admin o no
    username: computed(() => user.value?.fullName),

    //Actions
    login,
    logout,
    register,
  };
});
