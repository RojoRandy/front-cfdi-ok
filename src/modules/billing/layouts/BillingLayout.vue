<template>
  <!-- TopMenu -->
  <TopMenu @toggle-sidebar="toggleSidebar" />
  <!-- Sidebar -->
  <Sidebar :visible="showSidebar" @close="toggleSidebar" />

  <div class="transition-all ease-in-out duration-300"
    :class="{
      'w-[calc(100vw - 4rem)] ml-16': !showSidebar,
      'w-[calc(100vw - 16rem)] ml-64': showSidebar,
    }"
  >
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import TopMenu from '../components/TopMenu.vue';

const showSidebar = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
}

</script>