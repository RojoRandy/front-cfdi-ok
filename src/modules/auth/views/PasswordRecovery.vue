<template>
  <Modal
    v-if="isOpen"
    :title="currentStep !== 4 ? '¿Tienes problemas para acceder?' : ''"
    @close="onCancel"
  >
    <template v-slot:body>
      <div 
          v-if="isLoading"
          class="w-full flex flex-col items-center justify-center h-[200px]"
        >
          <Loading />
      </div>
      <template v-else>
        <div 
          v-if="currentStep === 1"
          id="step1"
          >
          <p class="text-slate-600 text-center text-sm">Ingresa el correo electrónico con el que te registraste y recibirás un código para recuperar tu contraseña</p>
          <Form
            @submit="onSubmit"
            :validation-schema="currentSchema.validationSchema"
            :initial-values="currentSchema.initialValues"
            keep-values
            v-slot="{values}"
            class="flex flex-col px-4 gap-4 my-4 items-center"
          >
            <TextInput 
              id="recoveryEmail"
              name="recoveryEmail"
              label="Correo Electrónico"
              placeholder="Ingresa tu correo"
              class="w-full"
            />
    
            <button 
              type="submit" 
              class="w-full btn-primary"
              >Enviar código</button>
          </Form>
  
        </div>
        <div 
          v-else-if="currentStep === 2" 
          id="step2"
          class="flex flex-col px-4 gap-4 my-4 items-center"
          >
          <p class="text-slate-600 text-center text-sm">Se envió un código a tu correo electrónico</p>
          <p class="text-slate-600 text-center text-sm">Ingresa el código para recuperar tu contraseña</p>
          <OtpInput 
            id="recoveryOtp"
            name="recoveryOtp"
            label="Código de recuperación"
            :digit-count="4"
            @update:otp="handleRecoveryCode"
            class="font-bold"
          />
          
          <button 
            type="submit" 
            class="w-full btn-primary mt-4"
            :disabled="disableSubmit2"
            @click="submitStep2"
            >Continuar</button>
          
          <button 
            type="button" 
            class="text-sm text-cyan-500 hover:underline hover:cursor-pointer select-none disabled:text-slate-400 disabled:hover:cursor-default disabled:hover:no-underline"
            @click="onResendCode"
            :disabled="isActive"
          >
            <span v-if="isActive">Espere {{ countdownTimer }}</span>
            <span v-else>Reenviar código</span>
          </button>

        </div>
        <div 
          v-else-if="currentStep === 3" 
          id="step3">

          <Form
            @submit="onSubmit"
            :validation-schema="currentSchema.validationSchema"
            :initial-values="currentSchema.initialValues"
            keep-values
            v-slot="{values}"
            class="p-4"
          >
            <TextInput
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              placeholder="Ingresar contraseña"
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
              type="password"
              label="Confirmar Contraseña"
              placeholder="Confirmar contraseña"
            />
  
            <div class="flex flex-row gap-2">
              <button 
              type="reset" 
              class="w-full btn-secondary mt-2"
              @click="onCancel"
              >Cancelar</button>
    
              <button 
              type="submit" 
              class="w-full btn-primary mt-2"
              >Actualizar</button>
            </div>
          </form>
        </div>
        <div 
          v-else-if="currentStep === 4" 
          id="step4"
          class="text-center space-y-4"
          >
          <h1 class="text-xl font-bold">¡Contraseña Actualizada!</h1>
          <p>Tu contraseña se actualizo de forma correcta.</p>
          <p>Guarda tu contraseña en un lugar seguro y no la compartas con nadie.</p>
          <button 
            type="button" 
            class="w-full btn-primary mt-4"
            @click="onCancel"
            >Finalizar</button>
        </div>
      </template>

    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/modules/common/components/Modal.vue';
import TextInput from '@/modules/common/components/TextInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { Form, useForm } from 'vee-validate';
import * as zod from 'zod'
import { useAuthStore } from '../stores/auth.store';
import { useToast } from 'vue-toastification';
import Loading from '@/modules/common/components/Loading.vue';
import { computed, ref } from 'vue';
import OtpInput from '@/modules/common/components/OtpInput.vue';
import { useIntervalFn } from '@vueuse/core';
import { usePassword } from '../composables/usePassword';

interface Props {
  isOpen: boolean
}

defineProps<Props>()
const emit = defineEmits(['cancel']);

const authStore = useAuthStore();
const toast = useToast();
const isLoading = ref(false)
const currentStep = ref(1);
const currentForm = ref(0);

const recoveryToken = ref('')
const disableSubmit2 = ref(true)
const countdownTimer = ref(30);
const {pause, resume, isActive } = useIntervalFn(()=> {
  if(currentStep.value === 2) {
    countdownTimer.value -= 1;
  
    if(countdownTimer.value === 0) {
      pause()
    }
  }
}, 1000)


const {hasLowercase, hasMinLength, hasNumber, hasSpecialChar, hasUppercase, passwordClasses} = usePassword();

const validationSchemaForm1 = toTypedSchema(zod.object({
  recoveryEmail: zod
      .string({ message: 'Correo por ingresar' })
      .email({ message: 'Debe ser un correo válido' }),
}))


const validationSchemaForm2 = toTypedSchema(
  zod
    .object({
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


const schemas = [
  {
    validationSchema: validationSchemaForm1,
    initialValues: {
      recoveryEmail: '',
    }
  },
  {
    validationSchema: validationSchemaForm2,
    initialValues: {
    password: '',
    passwordConfirm: '',
    }
  }
];

const currentSchema = computed(() => {
  return schemas[currentForm.value];
});


const valuesForm1 = ref(schemas[0].initialValues)

//Step 1
const onSubmit = async(values:any)=> {
  isLoading.value = true;
  if(currentForm.value === 0) {
    valuesForm1.value = values;
    await onSubmitStep1(values)
  }
  else if(currentForm.value === 1) {
    await onSubmitStep3(values)
  }
  isLoading.value = false;
}

const onSubmitStep1 = async (values: {recoveryEmail: string}) => {
  const response = await authStore.passwordRecovery(values.recoveryEmail)
  if(!response.success) {
    toast.error(response.message);
    return;
  }

  currentStep.value = 2;
}

//Step 2
const submitStep2 = async() => {
  isLoading.value = true;
  
  const response = await authStore.verifyPasswordRecoveryToken(valuesForm1.value.recoveryEmail!, recoveryToken.value)
  if(!response.success) {
    toast.error(response.message)
    isLoading.value = false;
    return;
  }

  currentStep.value = 3;
  currentForm.value = 1;
  isLoading.value = false;
}


const handleRecoveryCode = (event: {value: string, isCompleted: boolean}) => {
  disableSubmit2.value = !event.isCompleted;
  recoveryToken.value = event.value;
}

const onResendCode = async() => {
  isLoading.value = true;
  const response = await authStore.passwordRecovery(valuesForm1.value.recoveryEmail!)
  if(!response.success) toast.error(response.message)
  
  countdownTimer.value = 30;
  resume()
  disableSubmit2.value = true;
  isLoading.value = false;
}

//Step 3

const onSubmitStep3 = async (values: {password: string, passwordConfirm: string}) => {
  const response = await authStore.updatePassword({
    email: valuesForm1.value.recoveryEmail!,
    password: values.password,
    passwordConfirm: values.passwordConfirm,
    token: recoveryToken.value
  })

  if(!response.success) {
    toast.error(response.message)
    return false;
  }
  
  currentStep.value = 4;
}

const onCancel = () => {
  currentStep.value = 1;
  currentForm.value = 0;
  isLoading.value = false;
  recoveryToken.value = '',
  disableSubmit2.value = true;
  countdownTimer.value = 30;
  pause()
  emit('cancel');
};

</script>