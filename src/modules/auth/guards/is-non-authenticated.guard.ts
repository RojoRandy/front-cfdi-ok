import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useAuthStore } from "../stores/auth.store";

const isNonAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  await authStore.checkAuthStatus();

  authStore.isUnauthenticated ?  next({name: 'login'}) : next();
}

export default isNonAuthenticatedGuard;