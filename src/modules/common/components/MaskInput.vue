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
      <div class="relative">
        <input
          :id="id"
          :name="name" 
          type="text"
          v-model="maskedValue"
          v-maska="mask"
          class="block w-full text-sm border-2 border-gray-300 px-4 py-2 rounded-md text-cyan-900 placeholder:italic hover:border-cyan-500 focus:outline-none focus:ring-0"
          :class="inputTextClasses"
          :placeholder="placeholder"
          @maska="onMaska"
          :autofocus="autofocus"
        />
      </div>
      <span
        v-if="showErrors"
        class="text-[14px] text-red-400 mx-4"
      >
        &nbsp; {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useField } from 'vee-validate';
import type { MaskaDetail, MaskInputOptions } from 'maska';
import { vMaska } from 'maska/vue';

interface Props {
  id: string;
  name: string;
  label: string;
  mask: MaskInputOptions;
  autofocus?: boolean;
  modelValue?: string;
  placeholder?: string;
  showErrors?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Ingrese un texto',
  showErrors: true,
  autofocus: false,
  required: false
});
const emit = defineEmits(['update:modelValue']);

const { value, errorMessage, setValue } = useField(() => props.name, undefined, {
  syncVModel:true
});

const maskedValue = ref(value.value)

const onMaska = (event: CustomEvent<MaskaDetail>) => {
  setValue(event.detail.unmasked, true);
}

const inputTextClasses = computed(() => {
  return {
    'border-red-400 hover:border-red-400 focus:border-red-400 focus:outline-none focus:ring-0':
      errorMessage.value,
  };
});
</script>
