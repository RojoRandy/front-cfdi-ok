<template>
  <Modal
    v-if="isOpen"
    title="Cambiar Contraseña"
  >
    <template v-slot:body>

      <template v-if="passwordUpdated">
        <div class="text-center font-md">
          <p>Tu contraseña se actualizo de forma correcta</p>
          <p>Guarda tu contraseña en un lugar seguro y no la compartas con nadie.</p>
        </div>
      </template>
      <template v-else>
        <div 
          v-if="isLoading"
          class="w-full flex flex-col items-center justify-center h-[200px]"
        >
          <Loading />
        </div>
        <form
          v-else
          id="updatePasswordForm"
          @submit="onSubmit"
        >
          <TextInput 
            id="currentPassword"
            name="currentPassword"
            label="Contraseña Actual"
            type="password"
          />
          <TextInput 
            id="password"
            name="password"
            label="Nueva Contraseña"
            type="password"
            :show-errors="false"
          />
    
          <div class="flex flex-col gap-2 my-4 px-2">
            <p class="font-semibold text-xs">Reglas de seguridad de contraseña</p>
            <ul class="list-disc px-8 text-xs">
              <li :class="passwordClasses(hasMinLength(values.password!,8))">Mínimo 8 carácteres</li>
              <li :class="passwordClasses(hasUppercase(values.password!))">Una mayúscula</li>
              <li :class="passwordClasses(hasLowercase(values.password!))">Una minúscula</li>
              <li :class="passwordClasses(hasNumber(values.password!))">Un número (0-9)</li>
              <li :class="passwordClasses(hasSpecialChar(values.password!))">Un carácter especial (# _ @ $)</li>
            </ul>
          </div>
          <TextInput 
            id="passwordConfirm"
            name="passwordConfirm"
            label="Confirmar Contraseña"
            type="password"
          />
        </form>
      </template>
    </template>
    <template v-slot:footer>
      <div class="flex flex-row justify-end w-full gap-4">
        <button
          form="updatePasswordForm"
          type="reset"
          class="btn-secondary flex-1"
          @click="onCancel"
          :disabled="isLoading"
        >
          Cancelar
        </button>
        <button
          v-if="!passwordUpdated"
          form="updatePasswordForm"
          type="submit"
          class="btn-primary flex-1"
          :disabled="isLoading"
        >
          Actualizar
        </button>
        <button
          v-else
          type="reset"
          form="updatePasswordForm"
          class="btn-primary flex-1"
          :disabled="isLoading"
          @click="onCancel"
        >
          Finalizar
        </button>

      </div>
    </template>
  </Modal>

</template>

<script setup lang="ts">
import { usePassword } from '@/modules/auth/composables/usePassword';
import Modal from '@/modules/common/components/Modal.vue';
import TextInput from '@/modules/common/components/TextInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import * as zod from 'zod';
import { useUserProfileStore } from '../stores/user-profile.store';
import Loading from '@/modules/common/components/Loading.vue';
import { useToast } from 'vue-toastification';

interface Props {
  isOpen: boolean;
}

defineProps<Props>();
const emit = defineEmits(['cancel'])

const toast = useToast();
const userProfileStore = useUserProfileStore()
const isLoading = ref(false);
const passwordUpdated = ref(false);
const validationSchema = toTypedSchema(
  zod
    .object({
      currentPassword: zod
        .string({ message: 'Contraseña por ingresar' })
        .min(8, { message: 'Contraseña muy corta' }),
      password: zod
        .string({ message: 'Contraseña por ingresar' })
        .min(8, { message: 'Contraseña muy corta' }),
      passwordConfirm: zod
        .string({ message: 'Contraseña por ingresar' })
        .min(8, { message: 'Contraseña muy corta' }),
    })
    .superRefine(({ password, passwordConfirm }, ctx) => {
      if (passwordConfirm !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Las contraseñas no coinciden',
          path: ['passwordConfirm'],
        });
      }
    }),
);


const { handleSubmit, handleReset, values } = useForm({
  validationSchema,
  keepValuesOnUnmount: true,
  initialValues: {
    currentPassword: '',
    password: '',
    passwordConfirm: ''
  }
});

const {hasLowercase, hasMinLength, hasNumber, hasSpecialChar, hasUppercase, passwordClasses} = usePassword();

const onSubmit = handleSubmit(async (values)=>{
  isLoading.value = true;
  const response = await userProfileStore.updateUserPassword(values);
  
  if(!response.success) {
    toast.error(response.message);
    isLoading.value = false;
    return;
  }

  passwordUpdated.value = true;
  isLoading.value = false;
})

const onCancel = () => {
  handleReset();
  passwordUpdated.value = false;
  emit('cancel');
};
</script>