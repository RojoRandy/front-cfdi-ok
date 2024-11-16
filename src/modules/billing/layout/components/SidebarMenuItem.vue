<template>
  <button @click="$emit('itemClick')" >
    <RouterLink
      :to="routeName"
      class="flex flex-row items-center place-items-center mx-2 px-2.5 py-2 gap-4 
      hover:bg-theme-interface-secondary hover:bg-opacity-70 
      active:bg-theme-interface hover:cursor-pointer rounded-lg text-theme-interface-foreground 
      transition-all ease-in-out duration-200"
    >
      <component :is="icon" class="flex-shrink-0 fill-theme-interface-foreground w-[30px] h-[30px]"/>
      <span class="select-none">{{ text }}</span>
    </RouterLink>
  </button>
</template>

<script setup lang="ts">
import type { SidebarItemProps } from '../interfaces/sidebar.interface';

defineProps<SidebarItemProps>();

defineEmits(['itemClick'])
</script>
