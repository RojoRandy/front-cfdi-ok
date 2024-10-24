<template>
  <Modal
    v-if="isNewAccount"
    :title="!registerCompleted ? 'Crear nueva cuenta' : 'Registro Completado'"
    @close="$emit('cancel')"
  >
    <template v-slot:body>
      <template
        v-if="!registerCompleted"
      >
        <div 
          v-if="loading"
          class="w-full flex flex-col items-center justify-center h-[200px] "
        >
          <Loading />
        </div>
        <template
          v-else
          class="flex flex-col px-2 md:px-4"
        >
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
              placeholder="Ingresar contraseña"
              v-model="password"
              :show-errors="false"
            />

            <div class="flex flex-col gap-2 my-4 px-2">
              <p class="font-semibold text-sm">Reglas de seguridad de contraseña</p>
              <ul class="list-disc px-8 text-sm">
                <li :class="classValidator(password.length >= 8)">Mínimo 8 carácteres</li>
                <li :class="classValidator(hasUppercase)">Una mayúscula</li>
                <li :class="classValidator(hasLowercase)">Una minúscula</li>
                <li :class="classValidator(hasNumber)">Un número (0-9)</li>
                <li :class="classValidator(hasSpecialChar)">Un carácter especial (# _ @ $)</li>
              </ul>
            </div>

            <TextInput
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              label="Confirmar Contraseña"
              placeholder="Confirmar contraseña"
            />

            <div
              v-if="response?.success"
              class="flex flex-row gap-4 items-center bg-red-400 text-white font-semibold text-center px-4 py-2 rounded-md mt-2"
            >
              <ErrorOutline class="fill-white" />
              <span>{{ response?.message }}</span>
            </div>

            <div class="flex flex-col w-full gap-4 mt-4">
              <button
                type="submit"
                class="btn-primary"
                :disabled="loading"
              >
                Crear cuenta
              </button>

              <button
                type="reset"
                class="btn-secondary"
                @click="onCancel"
                :disabled="loading"
              >
                Cancelar
              </button>
            </div>
          </form>
        </template>

      </template>
      <div
        v-else
        class="flex flex-col px-2 md:px-4 text-center font-semibold text-md space-y-4"
      >
        <p>Gracias por completar tu registro.</p>
        <p>En breve recibirás un correo para confirmar sus datos de registro.</p>
        <p>Ya puedes acceder a la plataforma para empezar a conocerla</p>
        <button
          class="btn-primary"
          type="button"
          @click="enterToWebsite"
        >
          Ingresar al sitio
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

import Modal from '@/modules/common/components/Modal.vue';
import TextInput from '@/modules/common/components/TextInput.vue';
import { useAuthStore } from '../stores/auth.store';
import ErrorOutline from '@/icons/ErrorOutlineIcon.vue';
import type { ResponseDto } from '@/modules/common/interfaces/api-schema-response';
import Loading from '@/modules/common/components/Loading.vue';

interface Props {
  isNewAccount: boolean;
}

defineProps<Props>();
const emit = defineEmits(['cancel']);

const authStore = useAuthStore();

const password = ref('');
const hasUppercase = computed(() => validatePasswordContains(/[A-Z]/));
const hasLowercase = computed(() => validatePasswordContains(/[a-z]/));
const hasNumber = computed(() => validatePasswordContains(/[0-9]/));
const hasSpecialChar = computed(() => validatePasswordContains(/[@#$_]/));

const validatePasswordContains = (regex: RegExp) => {
  for (let i = 0; i < password.value.length; i++) {
    let ch = password.value.charAt(i);

    if (regex.test(ch)) return true;
  }
  return false;
};

const validationSchema = toTypedSchema(
  zod
    .object({
      email: zod
        .string({ message: 'Correo por ingresar' })
        .email({ message: 'Debe ser un correo válido' }),
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

const { handleSubmit, handleReset } = useForm({
  validationSchema,
  initialValues: {
    email: '',
    password: '',
    passwordConfirm: '',
  },
});

const classValidator = (validator: boolean) => {
  return {
    'text-green-500': validator,
    'text-red-400': !validator,
  };
};

const loading = ref(false);
const response = ref<ResponseDto | null>(null);

const registerCompleted = ref(false);

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  const { email, password, passwordConfirm } = values;
  response.value = await authStore.register({
    email,
    password,
    passwordConfirm,
  });

  if (response.value.success) {
    registerCompleted.value = true;
  }

  loading.value = false;
});

const enterToWebsite = () => {
  authStore.postRegister();
}

const onCancel = () => {
  handleReset();
  password.value = '';
  emit('cancel');
};
</script>
