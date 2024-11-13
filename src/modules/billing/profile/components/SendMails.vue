<template>
  <p class="mt-4 text-md text-slate-700">Este correo se utiliza para enviar las facturas a tus clientes, los datos se encuentran cifrados para tu seguridad</p>
  <form
    id="sendMailsForm" 
    @submit="onSubmit"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 my-4">
    <SelectInput
      id="mailServerId"
      name="mailServerId"
      label="Proveedor de correo"
      :options="mailServerStore.mailServers"
      option-label="name"
      option-value="id"
      option-filter="name"
    />
    <TextInput
      id="user"
      name="user"
      label="Correo Electrónico"
    />
    <TextInput
      id="password"
      name="password"
      type="password"
      label="Contraseña"
    />
  </form>
  <div
    class="border-t-2 pt-2"
  >
    <div class="flex flex-row justify-center">
      <button
        form="sendMailsForm"
        type="submit"
        class="btn-primary"
        :disabled="isLoading"
      >
        Guardar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMailServerStore } from '@/modules/catalog/mail-server/stores/mail-server.store';
import SelectInput from '@/modules/common/components/SelectInput.vue';
import TextInput from '@/modules/common/components/TextInput.vue';
import { useMailSenderStore } from '@/modules/shared/mailer/mail-sender/stores/useMailSenderStore';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import * as zod from 'zod';
import { useLoadingView } from '@/modules/common/composables/useLoadingView';

const loadingView = useLoadingView()
const mailServerStore = useMailServerStore();
const mailSenderStore = useMailSenderStore();
const isLoading = ref(false);
const toast = useToast();

const validationSchema = toTypedSchema(
  zod.object({
    mailServerId: zod.number({message: 'Seleccionar un proveedor de correos'}),
    user: zod
        .string({ message: 'Correo por ingresar' })
        .email({ message: 'Debe ser un correo válido' }),
    password: zod
      .string({ message: 'Ingresar la contraseña de tu correo'})
      .min(1,{ message: 'Ingresar la contraseña de tu correo'})
  })
);

const {handleSubmit, resetForm} = useForm({
  validationSchema,
  keepValuesOnUnmount: true
})

const onSubmit = handleSubmit(async (values)=>{
  loadingView.setIsLoading(true);
  const response = await mailSenderStore.saveMailSender(values)

  if(!response.success) toast.error(response.message);

  toast.success('La configuración de correo se guardó correctamente');
  loadingView.setIsLoading(false);
})


onMounted(async ()=> {
  loadingView.setIsLoading(true);
  
  await mailSenderStore.getMailSender();
  
  if(mailSenderStore.mailSender) {
    resetForm({
      values: {
        user: mailSenderStore.mailSender.user,
        password: mailSenderStore.mailSender.password,
        mailServerId: mailSenderStore.mailSender.mailServer.id
      }
    })
  }

  loadingView.setIsLoading(false);
})

</script>
