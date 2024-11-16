<template>
  <div class="sticky z-40 top-0 bg-white h-14 shadow-md">
    <div class="h-full flex flex-row justify-between py-2 px-2">
      <div class="flex flex-row gap-4 items-center">
        <button
          type="button"
          @click="$emit('toggleSidebar')"
          class="rounded-lg px-2 py-1 hover:bg-slate-300 hover:bg-opacity-70"
        >
          <MenuSidebar class="fill-theme-icons w-[30px] h-[30px]" />
        </button>
        Logotipo
      </div>
      <ProfileMenu />
    </div>
  </div>

</template>

<script setup lang="ts">
import MenuSidebar from '@/icons/SidebarIcon.vue';
import ProfileMenu from './ProfileMenu.vue';

defineEmits(['toggleSidebar']);

</script>
