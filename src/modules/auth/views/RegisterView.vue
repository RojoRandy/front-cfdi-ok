<template>
  <Modal 
    v-if="isNewAccount"
    title="Crear nueva cuenta"
    @close="$emit('cancel')"
  >
  <template v-slot:body>
    <div class="flex flex-col px-20">
      <p class="self-center mb-5">Estas a unos pasos de poder generar tu primera factura</p>

      <form @submit="onSubmit">
        <TextInput
        id="email"
        name="email"
        type="email"
        label="Correo Electrónico"
        placeholder="ejemplo@correo.com"
      />

      <TextInput
        id="password"
        name="password"
        type="password"
        label="Contraseña"
        v-model="password"
        :show-errors="false"
      />

      <div class="flex flex-col gap-2 my-4 px-2">
        <p class="font-semibold">Reglas de seguridad de contraseña</p>
        <ul class="list-disc px-8">
          <li :class="classValidator(password.length>=8)">Mínimo 8 carácteres</li>
          <li :class="classValidator(hasUppercase)">Una mayúscula</li>
          <li :class="classValidator(hasLowercase)">Una minúscula</li>
          <li :class="classValidator(hasNumber)">Un número (0-9)</li>
          <li :class="classValidator(hasSpecialChar)">Un carácter especial (# _ @ $)</li>
        </ul>
      </div>

      <TextInput
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirmar Contraseña"
      />

      <div class="flex flex-col w-full gap-4 mt-4">
      <button
        type="submit"
        class="btn-primary"
      >
        Crear cuenta
      </button>

      <button
        type="reset"
        class="btn-secondary"
        @click="onCancel"
      >
        Cancelar
      </button>
    </div>
      </form>
    </div>
  </template>
  </Modal>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

import Modal from '@/modules/common/components/Modal.vue';
import TextInput from '@/modules/common/components/TextInput.vue';
import { computed, ref } from 'vue';

interface Props {
  isNewAccount: boolean
}

defineProps<Props>();
const emit = defineEmits(['cancel'])

const password = ref('')
const hasUppercase = computed(()=> validatePasswordContains(/[A-Z]/));
const hasLowercase = computed(()=> validatePasswordContains(/[a-z]/));
const hasNumber = computed(()=> validatePasswordContains(/[0-9]/));
const hasSpecialChar = computed(()=> validatePasswordContains(/[@#$_]/));

const validatePasswordContains = (regex: RegExp) => {
  for (let i = 0; i < password.value.length; i++) {
    let ch = password.value.charAt(i);

    if (regex.test(ch)) return true;
  }
  return false;
}

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string({ message: 'Correo por ingresar' })
      .email({ message: 'Debe ser un correo válido' }),
    password: zod
      .string({ message: 'Contraseña por ingresar' })
      .min(8, { message: 'Contraseña muy corta' }),
    confirmPassword: zod
      .string({ message: 'Contraseña por ingresar' })
      .min(8, { message: 'Contraseña muy corta' }),
  }).superRefine(({password, confirmPassword}, ctx)=>{
    if(confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword']
      })
    }
  })
);

const { handleSubmit, handleReset } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
    confirmPassword: ''
  }
});

const classValidator = (validator:boolean) => {
  return {
    'text-green-500': validator, 
    'text-red-400': !validator
  }
}

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
});

const onCancel = () => {
  handleReset();
  password.value = '';
  emit('cancel');
}

</script>
