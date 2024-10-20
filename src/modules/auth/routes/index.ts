import type { RouteRecordRaw } from 'vue-router';
import isNonAuthenticatedGuard from '../guards/is-non-authenticated.guard';
import isAuthenticatedGuard from '../guards/is-authenticated.guard';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'auth',
  beforeEnter: [isNonAuthenticatedGuard],
  redirect: { name: 'login' },
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/modules/auth/views/LoginView.vue'),
    },
    {
      path: 'register',
      name: 'register',
      component: () => import('@/modules/auth/views/RegisterView.vue'),
    },
  ],
};
