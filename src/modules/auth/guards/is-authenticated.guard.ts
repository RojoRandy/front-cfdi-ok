import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {

  const authStore = useAuthStore();

  await authStore.checkAuthStatus();
  
  authStore.isAuthenticated ?  next({name: 'Home'}) : next();
};

export default isAuthenticatedGuard;
