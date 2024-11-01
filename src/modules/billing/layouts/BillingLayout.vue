<template>
  <!-- TopMenu -->
  <TopMenu @toggle-sidebar="toggleSidebar" />
  <!-- Sidebar -->
  <Sidebar
    :visible="showSidebar"
    @close="toggleSidebar"
  />

  <div
    class="transition-all ease-in-out duration-300"
    :class="{
      'w-[calc(100vw - 4rem)] md:ml-16': !showSidebar,
      'w-[calc(100vw - 16rem)] ml-64': showSidebar,
    }"
  >
    <div
      v-if="loading"
      class="w-full flex flex-col items-center justify-center h-[200px]"
    >
      <Loading />
    </div>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Sidebar from '../components/layout/Sidebar.vue';
import TopMenu from '../components/layout/TopMenu.vue';
import { useUserProfileStore } from '../stores/user-profile.store';
import Loading from '@/modules/common/components/Loading.vue';
const showSidebar = ref(false);

const userProfileStore = useUserProfileStore();


const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const loading = ref(false);
onMounted(async () => {
  await userProfileStore.getUserProfile();
});
</script>
