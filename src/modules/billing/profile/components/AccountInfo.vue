<template>
  <p class="mt-4 text-md text-slate-700">Son las credenciales con las que ingresas a tu cuenta de Facturación Ok</p>

  <form
    id="accountInfoForm"
    @submit="onSubmit"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 my-4"
  >
    <TextInput
      id="fullName"
      name="fullName"
      label="Nombre Completo"
      required
    />
    <TextInput
      id="email"
      name="email"
      label="Correo Electrónico"
      required
    />
    <button
      type="button"
      class="btn-primary md:mt-6 md:mb-5"
      @click="updatePassword = true"
    >
      Cambiar contraseña
    </button>
  </form>
  <div class="border-t-2 pt-2">
    <div class="flex flex-row justify-center">
      <button
        form="accountInfoForm"
        type="submit"
        class="btn-primary"
      >
        Guardar
      </button>
    </div>
  </div>
  
  <UpdatePasswordAccount 
    :is-open="updatePassword"
    @cancel="updatePassword = false"
  />
</template>

<script setup lang="ts">
import TextInput from '@/modules/common/components/TextInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import * as zod from 'zod';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { useUserProfileStore } from '../stores/user-profile.store';
import UpdatePasswordAccount from './UpdatePasswordAccount.vue';

const authStore = useAuthStore();
const userProfileStore = useUserProfileStore();

const updatePassword = ref(false)
const validationSchema = toTypedSchema(
  zod.object({
    fullName: zod
      .string({ message: 'Debes ingresar tu nombre'})
      .min(1, { message: 'Debes ingresar tu nombre'}),
    email: zod
      .string({ message: 'Correo por ingresar' })
      .email({ message: 'Debe ser un correo válido' }),
  }),
);

const { handleSubmit, resetForm } = useForm({
  validationSchema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit(async (values) => {
  const response = await userProfileStore.saveUserInfo(values);

  if (response.success) console.log(response.message);
});

const setInitialValues = () => {
  resetForm({
    values: {
      fullName: authStore.fullName,
      email: authStore.email,
    },
  });
};

onMounted(() => {
  setInitialValues();
});
</script>
