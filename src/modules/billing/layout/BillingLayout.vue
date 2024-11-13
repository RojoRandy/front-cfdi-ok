<template>
  <!-- TopMenu -->
  <TopMenu @toggle-sidebar="toggleSidebar" />
  <!-- Sidebar -->
  <Sidebar
    :visible="showSidebar"
    @close="toggleSidebar"
  />

  <LoadingView/>
  <div class="transition-all ease-in-out duration-300 w-[calc(100vw - 4rem)] md:ml-16">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import TopMenu from './components/TopMenu.vue';
import LoadingView from '@/modules/common/components/LoadingView.vue';

const showSidebar = ref(false);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

</script>
