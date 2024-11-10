import { authRoutes } from '@/modules/auth/routes';
import { billingRoutes } from '@/modules/billing/layout/routes';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Auth Routes
    authRoutes,

    //Billing Routes
    billingRoutes
  ],
});

export default router;
