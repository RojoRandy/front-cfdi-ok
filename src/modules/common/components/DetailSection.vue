<template>
    <div class="realtive z-0 bg-white p-2 rounded-md drop-shadow"

      >
      <div 
      @click="open=!open"
      class="flex gap-2 select-none hover:cursor-pointer">
        <span>
          <ArrowRight 
            class="w-6 h-6 fill-black transition-all ease-linear" 
            :class="{
              'rotate-90': open
            }"/>
        </span>
        <slot name="summary">
          Summary
        </slot>   
      </div>
      <div class="transition-all ease-in" :class="{'hidden': !open}">
        <slot name="content">
        </slot>

      </div>
    </div>
</template>

<script setup lang="ts">
import ArrowRight from '@/icons/ArrowRight.vue';
import { ref } from 'vue';

const open = ref(false);

</script>
