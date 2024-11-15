<template>
  <RouterView />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useRouter, useRoute } from 'vue-router';
import { AuthStatus } from './modules/auth/interfaces';
import { useAuthStore } from './modules/auth/stores/auth.store';
import { useUserProfileStore } from './modules/billing/profile/stores/user-profile.store';

const authStore = useAuthStore();
const userProfileStore = useUserProfileStore()

const router = useRouter();
const route = useRoute();

authStore.$subscribe(
  async (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      await authStore.checkAuthStatus();
      return;
    }
    
    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'dashboard' });
      return;
    }
    
    if(state.authStatus === AuthStatus.Unauthenticated ) {
      userProfileStore.clearUserProfile();
      router.replace({ name: 'login' })
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>
