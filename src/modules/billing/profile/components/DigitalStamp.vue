<template>
  <form 
    id="digitalStampForm"
    @submit.prevent="onSubmit"
    class="flex flex-col my-4 gap-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div class="flex flex-col gap-2">
        <FileInput
          id="certificate"
          name="certificate"
          label="Certificado (archivo .cer)"
          accept=".cer, application/x-x509-ca-cert, application/pkix-cert"
          @change="onCertificateChange"
        />
        <span
          :class="{
            'text-theme-success': userProfileStore.csdCredentials?.certificadoSubido,
            'text-theme-destructive': !userProfileStore.csdCredentials?.certificadoSubido,
          }">
          {{ userProfileStore.csdCredentials?.certificadoSubido  ? 'Certificado subido' : 'Certificado pendiente de subir' }}
        </span>
      </div>
      <TextInput
        id="numSerieCertificado"
        name="numSerieCertificado"
        type="text"
        label="Número de Serie (Certificado)"
      />
    </div>
    <hr>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div class="flex flex-col gap-2">
        <FileInput
          id="publicKey"
          name="publicKey"
          label="Llave Pública"
          accept=".key, application/octet-stream, application/vnd.apple.keynote"
          @change="onPublicKeyChange"
        />
        <span
          :class="{
            'text-theme-success': userProfileStore.csdCredentials?.llavePublicaSubida,
            'text-theme-destructive': !userProfileStore.csdCredentials?.llavePublicaSubida,
          }">
          {{ userProfileStore.csdCredentials?.llavePublicaSubida  ? 'Llave pública subida' : 'Llave pública pendiente de subir' }}
        </span>

      </div>
      <TextInput
        id="contrasenaLlavePublica"
        name="contrasenaLlavePublica"
        type="password"
        label="Contraseña (Llave Pública)"
      />
    </div>
  </form>
  <div
    class="border-t-2 pt-2"
  >
    <div class="flex flex-row justify-center">
      <button
        form="digitalStampForm"
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
import FileInput from '@/modules/common/components/FileInput.vue';
import TextInput from '@/modules/common/components/TextInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import * as zod from 'zod'
import { useUserProfileStore } from '../stores/user-profile.store';
import { useToast } from 'vue-toastification';
import { useLoadingView } from '@/modules/common/composables/useLoadingView';

const loadingView = useLoadingView()
const userProfileStore = useUserProfileStore()
const isLoading = ref(false)
const toast = useToast();

const validationSchema = toTypedSchema(zod.object({
  numSerieCertificado: zod.string({message: "Ingresar el número de serie de tu certificado"}),
  contrasenaLlavePublica: zod.string({message: "Ingresar contraseña de tu llave pública"})
}))

const {handleSubmit, resetForm} = useForm({
  validationSchema,
  keepValuesOnUnmount: true,
})

const onCertificateChange = async (files: FileList) => {
  loadingView.setIsLoading(true);
  if(files && files.length) {
    const response = await userProfileStore.saveCsdCertificateFile(files[0])

    if(!response.success) toast.error(response.message);
    toast.success('El certificado se guardó correctamente');
  }
  loadingView.setIsLoading(false);
}

const onPublicKeyChange = async (files: FileList) => {
  loadingView.setIsLoading(true);
  if(files && files.length) {
    const response = await userProfileStore.saveCsdPublicKeyFile(files[0])

    if(!response.success) toast.error(response.message);
    toast.success('La Llave Pública se guardó correctamente');
  }
  loadingView.setIsLoading(false);
}

const onSubmit = handleSubmit(async(values)=>{
  loadingView.setIsLoading(true);

  const response = await userProfileStore.saveCsdCredentials(values)

  if(!response.success) toast.error(response.message);
  toast.success('Las credenciales se guardaron correctamente');

  loadingView.setIsLoading(false);
})

onMounted(async ()=>{
  loadingView.setIsLoading(true);
  await userProfileStore.getCsdCredentials()

  resetForm({
    values: {
      numSerieCertificado: userProfileStore.csdCredentials?.numSerieCertificado,
      contrasenaLlavePublica: userProfileStore.csdCredentials?.contrasenaLlavePublica
    }
  })
  loadingView.setIsLoading(false);
})
</script>
