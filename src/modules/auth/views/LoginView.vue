<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-[30px] md:text-[40px]">Bienvenido a</h1>
    <h1 class="text-[40px] md:text-[60px] text-cyan-600 font-bold">Facturación Ok</h1>
    <h1 class="text-[20px] md:text-[20px]">Tus facturas a unos cuantos pasos</h1>
  </div>

  <form @submit="onSubmit">
    <div class="flex flex-col gap-2 my-4">
      <TextInput
        id="login_email"
        name="email"
        type="email"
        label="Correo Electrónico"
        placeholder="ejemplo@correo.com"
      />

      <TextInput
        id="login_password"
        name="password"
        type="password"
        label="Contraseña"
      />
      <label class="italic text-cyan-500 hover:underline hover:cursor-pointer select-none self-end"
        >Olvidaste tu contraseña</label
      >
      <button
        type="submit"
        class="btn-primary"
        :disabled="loading"
      >
        Iniciar Sesion
      </button>
    </div>
  </form>
  
  <div class="flex flex-col gap-4">
    <div class="flex justify-center items-center gap-4">
      <hr class="flex-1 border-gray-400 opacity-50" />
      <span class="font-semibold text-[14px] select-none">O</span>
      <hr class="flex-1 border-gray-400 opacity-50" />
    </div>

    <button
      type="button"
      class="btn-secondary"
      :disabled="loading"
      @click="isNewAccount = true"
    >
      Crear cuenta
    </button>
  </div>

  <RegisterView 
    :is-new-account="isNewAccount"
    @cancel="isNewAccount = false"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

import TextInput from '@/modules/common/components/TextInput.vue';
import RegisterView from './RegisterView.vue';

import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const toast = useToast();

const validationSchema = toTypedSchema(
  zod.object({
    email: zod
      .string({ message: 'Correo por ingresar' })
      .email({ message: 'Debe ser un correo válido' }),
    password: zod
      .string({ message: 'Contraseña por ingresar' })
      .min(1, { message: 'Contraseña por ingresar' }),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const loading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  const success = await authStore.signIn(values.email, values.password);

  if (!success) toast.error(authStore.errorMessage);

  loading.value = false;
});


const isNewAccount = ref(false)

</script>
