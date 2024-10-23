<template>
  <RouterLink
    :to="routeName"
    class="flex flex-row items-center place-items-center mx-2 px-2.5 py-2 gap-4 hover:bg-slate-800 hover:bg-opacity-70 active:bg-cyan-500 hover:cursor-pointer rounded-lg text-white transition-all ease-in-out duration-200"
  >
    <component :is="icon" class="flex-shrink-0 fill-white w-[30px] h-[30px]"/>
    <span class="select-none">{{ text }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import type { SidebarItemProps } from '../interfaces/sidebar.interface';

defineProps<SidebarItemProps>();
</script>
