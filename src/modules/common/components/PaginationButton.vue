<template>
  <div class="flex justify-center py-10 bg-gray-100 gap-4">
    <button
      :disabled="isFirstPage"
      @click="$router.push({ query: { page: page - 1 } })"
      class="flex items-center space-x-1.5 bg-blue-500 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
    >
      <ArrowLeft />
      <span> Anteriores </span>
    </button>
    <button
      :disabled="hasMoreData"
      @click="$router.push({ query: { page: page + 1 } })"
      class="flex items-center space-x-1.5 bg-blue-500 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
    >
      <span> Siguiente </span>
      <ArrowRight />
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowLeft from '@/icons/ArrowLeft.vue';
import ArrowRight from '@/icons/ArrowRight.vue';

interface Props {
  page: number;
  isFirstPage: boolean;
  hasMoreData: boolean;
}

defineProps<Props>();
</script>
