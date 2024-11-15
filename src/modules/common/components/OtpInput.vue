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
    <div ref="otpCont" class="flex flex-row gap-2 text-center">
      <input
        type="text"
        class="block text-center w-full text-sm border-2 border-gray-300 px-4 py-2 rounded-md text-cyan-900 placeholder:italic hover:border-cyan-500 focus:outline-none focus:ring-0"
        :class="{bounce: digits[index] !== null}"
        v-for="(el, index) in digits"
        :key="el + index"
        v-model="digits[index]"
        :autofocus="index === 0"
        :placeholder="'_'"
        :maxlength="1"
        @keydown="handleKeyDown($event, index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Props {
  id: string;
  name: string;
  label: string;
  digitCount: number;
  default?: string;
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  default: '',
  required: false
});

const emit = defineEmits(['update:otp']);

const digits = reactive<string[]>([]);

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i);
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = '';
  }
}

const otpCont = ref<HTMLDivElement>();

const handleKeyDown = function (event: any, index: number) {
  if (event.key !== "Tab" && 
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = '';

    if (index != 0) {
      //@ts-ignore
      (otpCont.value!.children)[index-1].focus();
    } 
  }

  if ((new RegExp('^([0-9])$')).test(event.key)) {
    digits[index] = event.key;

    if (index != props.digitCount - 1) {
      //@ts-ignore
      (otpCont.value!.children)[index+1].focus();
    }
  }

  // if (isDigitsFull()) {
  //   emit('update:otp', digits.join(''))
  // }
  emit('update:otp', {
    value: digits.join(''),
    isCompleted: isDigitsFull()
  })
}

const isDigitsFull = function () {
  for (const elem of digits) {
    if (elem == null || elem == undefined || elem === '') {
      return false;
    }
  }

  return true;
}
</script>

<style scoped>
.digit-box {
  height: 4rem;
  width: 2rem;
  border: 2px solid black;
  display: inline-block;
  border-radius: 5px;
  margin: 5px;
  padding: 15px;
  font-size: 3rem;
}

.digit-box:focus {
  outline: 3px solid black;
}

.bounce {
  animation: pulse .3s ease-in-out alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}
</style>
