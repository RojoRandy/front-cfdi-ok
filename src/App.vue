<template>
  <RouterView />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useRouter, useRoute } from 'vue-router';
import { AuthStatus } from './modules/auth/interfaces';
import { useAuthStore } from './modules/auth/stores/auth.store';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuthStatus();
      return;
    }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'dashboard' });
      return;
    }

    if(state.authStatus === AuthStatus.Unauthenticated ) {
      router.replace({ name: 'login' })
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>
