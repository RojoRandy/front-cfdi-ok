<template>
  <div ref="otpCont">
    <input
      type="text"
      class="digit-box"
      v-for="(el, index) in digits"
      :key="el + index"
      v-model="digits[index]"
      :autofocus="index === 0"
      :placeholder="index + 1 + ''"
      :maxlength="1"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Props {
  default: string;
  digitCount: number;
}

const props = defineProps<Props>();

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

const otpCont = ref(null);
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
</style>
