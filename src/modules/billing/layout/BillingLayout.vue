<template>
  <!-- TopMenu -->
  <TopMenu @toggle-sidebar="toggleSidebar" />
  <!-- Sidebar -->
  <Sidebar
    :visible="showSidebar"
    @close="toggleSidebar"
  />

  <LoadingView v-if="authStore.isLoading"/>
  <div
    v-else
    class="transition-all ease-in-out duration-300"
    :class="{
      'w-[calc(100vw - 4rem)] md:ml-16': !showSidebar,
      'w-[calc(100vw - 16rem)] ml-64': showSidebar,
    }"
  >
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import TopMenu from './components/TopMenu.vue';
import LoadingView from '@/modules/common/components/LoadingView.vue';
// import { useLoadingView } from '@/modules/common/composables/useLoadingView';
import { useAuthStore } from '@/modules/auth/stores/auth.store';

const authStore = useAuthStore();
const showSidebar = ref(false);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
</script>
