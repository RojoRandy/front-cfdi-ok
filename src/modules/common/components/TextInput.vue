<template>
  <div class="flex flex-col gap-2">
    <label
      for="lbl_correo"
      class="text-cyan-950 font-semibold"
      >{{ label }}</label
    >
    <div class="flex flex-col">
      <input
        :id="id"
        :name="name"
        :type="type || 'text'"
        v-model="value"
        class="border-2 border-gray-300 px-4 py-2 rounded-md text-cyan-900 placeholder:italic hover:border-cyan-500 focus:outline-none focus:ring-0"
        :class="inputTextClasses"
        :placeholder="placeholder"
        @input="handleChange"
        @blur="handleBlur"
      />
      <span v-if="showErrors" class="text-[14px] text-red-400 mx-4"> &nbsp; {{ errorMessage }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, type InputTypeHTMLAttribute } from 'vue';

interface Props {
  id: string;
  name: string;
  label: string;
  modelValue?: string;
  type?: InputTypeHTMLAttribute | undefined;
  placeholder?: string;
  showErrors?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: 'Ingrese un texto',
  showErrors: true
});
const { value, errorMessage, handleChange, handleBlur } = useField(() => props.name, undefined, {
  syncVModel: true,
});

const inputTextClasses = computed(() => {
  return {
    'border-red-400 hover:border-red-400 focus:border-red-400 focus:outline-none focus:ring-0':
      errorMessage.value,
  };
});
</script>
