import { authRoutes } from '@/modules/auth/routes';
import { billingRoutes } from '@/modules/billing/routes';
import ShopLayout from '@/modules/shop/layouts/ShopLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'shop',
    //   component: ShopLayout,
    //   children: [
    //     {
    //       path: '',
    //       name: 'Home',
    //       component: () => import('@/modules/shop/views/HomeView.vue'),
    //     },
    //   ],
    // },
    //Auth Routes
    authRoutes,

    //Billing Routes
    billingRoutes
  ],
});

export default router;
