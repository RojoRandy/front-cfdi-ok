<template>
  <div class="flex flex-col gap-2">
    <label
      :for="name"
      class="text-cyan-950 font-semibold text-sm"
      >
      {{ label }}
      <span v-if="required" class="text-red-400 font-semibold text-sm">*</span>
      </label
      
    >
    <div class="flex flex-col">
      <input
        ref="fileInputRef"
        :id="id"
        :name="name"
        type="file"
        class="w-full text-sm text-stone-500
          file:mr-4 file:py-2 file:px-4
          file:border-0 file:rounded-full
          file:text-sm file:font-semibold
        file:bg-cyan-600 file:text-white
          file:disabled:bg-gray-400 file:disabled:cursor-not-allowed
          hover:file:cursor-pointer
        hover:file:bg-cyan-700"
        :class="inputTextClasses"
        :autofocus="autofocus"
        :disabled="disabled"
        :accept="accept"
        @change="onFileChanged"
        :multiple="multiple"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

interface Props {
  id: string;
  name: string;
  label: string;
  autofocus?: boolean;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
}

withDefaults(defineProps<Props>(), {
  autofocus: false,
  required: false,
  disabled: false,
  accept: '*',
  multiple: false
});

const emit = defineEmits<{
  change: [files: any]
}>()

const fileInputRef = useTemplateRef('fileInputRef');

const onFileChanged = (event: Event) => {
  event.preventDefault()
  emit('change', fileInputRef.value?.files)
}

// const { value, errorMessage, handleChange, handleBlur } = useField(() => props.name);

const inputTextClasses = computed(() => {
  return {
    'border-red-400 hover:border-red-400 focus:border-red-400 focus:outline-none focus:ring-0': false
  };
});
</script>
