<template>
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-[30px] md:text-[40px]">Bienvenido a</h1>
    <h1 class="text-[40px] md:text-[60px] text-cyan-600 font-bold">
      Facturación Ok
    </h1>
    <h1 class="text-[20px] md:text-[20px]">
      Tus facturas a unos cuantos pasos
    </h1>
  </div>

  <div class="flex flex-col mt-10 mb-5">
    <h1 class="text-[24px] font-semibold">Inicia Sesión</h1>
    <h1 class="text-[16px] font-semibold">Ingresa tu correo y contraseña</h1>
  </div>

  <form @submit="onSubmit">
    <div class="flex flex-col gap-4">
      <InputText
        id="login_email"
        name="correo"
        type="email"
        label="Correo Electrónico"
        placeholder="ejemplo@correo.com"
      />

      <InputText
        id="login_password"
        name="password"
        type="password"
        label="Contraseña"
      />
      <label
        class="italic text-cyan-500 hover:underline hover:cursor-pointer select-none self-end"
        >Olvidaste tu contraseña</label
      >
      <button
        type="submit"
        class="btn-primary"
      >
        Iniciar Sesion
      </button>

      <div class="flex justify-center items-center gap-4">
        <hr class="flex-1 border-gray-400 opacity-50" />
        <span class="font-semibold text-[14px] select-none">O</span>
        <hr class="flex-1 border-gray-400 opacity-50" />
      </div>

      <button
        type="button"
        class="btn-secondary"
      >
        Crear cuenta
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

import InputText from '@/modules/common/components/InputText.vue';

const user = ref('');

const validationSchema = toTypedSchema(
  zod.object({
    correo: zod
      .string()
      .min(1, { message: 'This is required' })
      .email({ message: 'Must be a valid email' }),
    password: zod
      .string()
      .min(1, { message: 'This is required' })
      .min(8, { message: 'too short' }),
  }),
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>
