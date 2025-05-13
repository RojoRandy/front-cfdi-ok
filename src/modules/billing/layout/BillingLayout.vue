<template>
  <!-- TopMenu -->
  <TopMenu 
    @toggle-sidebar="toggleSidebar"/>
  <!-- Sidebar -->
  <Sidebar
    :visible="showSidebar"
    @close="toggleSidebar"
  />

  <ThemeSettings 
    :visible="userProfileStore.isCustomThemeVisible"
    @close="userProfileStore.isCustomThemeVisible = !userProfileStore.isCustomThemeVisible"
  />

  <LoadingView/>
  <div class="transition-all ease-in-out duration-300 w-[calc(100vw - 4rem)] md:ml-16 p-8">
    <RouterView />
  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import TopMenu from './components/TopMenu.vue';
import LoadingView from '@/modules/common/components/LoadingView.vue';

import { useLoadingView } from '@/modules/common/composables/useLoadingView';
import { useUserProfileStore } from '../profile/stores/user-profile.store';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import ThemeSettings from './components/ThemeSettings.vue';
import { useTheme } from './composable/useTheme';

const loadingView = useLoadingView()
const userProfileStore = useUserProfileStore();
const authStore = useAuthStore()
const showSidebar = ref(false);
const { applyTheme, getTheme } = useTheme();

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

onMounted(async ()=> {
  loadingView.setIsLoading(true);
  await authStore.checkAuthStatus();
  await userProfileStore.getUserProfile();
  applyTheme(getTheme.value);
  loadingView.setIsLoading(false);
})

</script>