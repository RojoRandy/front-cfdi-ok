<template>
  <div class="flex flex-col gap-2">
    <label
      for="lbl_correo"
      class="text-cyan-950 font-semibold"
      >{{ label }}</label
    >
    <div class="flex flex-col">
      <div class="relative">
        <input
          :id="id"
          :name="name"
          :type="inputType"
          v-model="value"
          class="block w-full border-2 border-gray-300 px-4 py-2 rounded-md text-cyan-900 placeholder:italic hover:border-cyan-500 focus:outline-none focus:ring-0"
          :class="inputTextClasses"
          :placeholder="placeholder"
          @input="handleChange"
          @blur="handleBlur"
        />
        <button
          v-if="type === 'password'"
          type="button"
          data-hs-toggle-password='{"target": "#hs-toggle-password"}'
          class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
          @click="togglePassword"
        >
          <OpenEye
            v-if="inputType === 'password'"
            class="fill-cyan-600"
          />
          <CloseEye
            v-if="inputType === 'text'"
            class="fill-cyan-600"
          />
        </button>
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
import CloseEye from '@/icons/CloseEyeIcon.vue';
import OpenEye from '@/icons/OpenEyeIcon.vue';
import { useField } from 'vee-validate';
import { computed, ref, type InputTypeHTMLAttribute } from 'vue';

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
  showErrors: true,
});

const inputType = ref<InputTypeHTMLAttribute | undefined>(props.type || 'text');

const { value, errorMessage, handleChange, handleBlur } = useField(() => props.name, undefined, {
  syncVModel: true,
});

const togglePassword = () => {
  if (inputType.value === 'text') inputType.value = 'password';
  else if (inputType.value === 'password') inputType.value = 'text';
};

const inputTextClasses = computed(() => {
  return {
    'border-red-400 hover:border-red-400 focus:border-red-400 focus:outline-none focus:ring-0':
      errorMessage.value,
  };
});
</script>
