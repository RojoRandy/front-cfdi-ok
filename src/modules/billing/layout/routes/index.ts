
import type { RouteRecordRaw } from 'vue-router';

export const billingRoutes: RouteRecordRaw = {
  path: '/',
  name: 'billing-layout',
  redirect: {name: 'dashboard'},
  component: () => import('@/modules/billing/layout/BillingLayout.vue'),
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/modules/billing/views/DashboardView.vue')
    },
    {
      path: '/billing',
      name: 'billing',
      component: () => import('@/modules/billing/views/BillingView.vue')
    },
    {
      path: '/payments',
      name: 'payments',
      component: () => import('@/modules/billing/views/PaymentsView.vue')
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import('@/modules/billing/views/ClientsView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/modules/billing/views/ProductsView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/modules/billing/profile/views/UserProfileView.vue')
    },
  ]
};
