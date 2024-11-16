<template>
  <p class="mt-4 text-sm text-theme-text-paragraph">Recuerda que estos campos deben estar ingresados exactamente igual a como se muestra en tu Constancia de Situacion Fiscal</p>
  <form
    id="fiscalDataForm"
    @submit="onSubmit"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 my-4"
  >
    <MaskInput
      id="rfc"
      name="rfc"
      label="R.F.C"
      :mask="options"
      placeholder="XXXX-######-XXX"
      required
    />
    <TextInput
      id="nombreFiscal"
      name="nombreFiscal"
      label="Nombre fiscal"
      :max-length="50"
      required
    />
    <SelectInput
      id="regimenFiscalId"
      name="regimenFiscalId"
      label="Régimen Fiscal"
      :options="regimenFiscalStore.fiscalRegimes"
      option-label="descripcion"
      option-value="id"
      option-filter="descripcion"
      required
      class="md:col-span-2"
    />
  </form>
  <div
    class="border-t-2 pt-2"
  >
    <div class="flex flex-row justify-center">
      <button
        form="fiscalDataForm"
        type="submit"
        class="btn-primary"
      >
        Guardar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import MaskInput from '@/modules/common/components/MaskInput.vue';
import type { MaskInputOptions } from 'maska';

import SelectInput from '@/modules/common/components/SelectInput.vue';
import TextInput from '@/modules/common/components/TextInput.vue';

import { rfcPFRegex, rfcPMRegex } from '@/modules/common/utils/regex';
import { useRegimenFiscalStore } from '@/modules/catalog/regimen-fiscal/stores/regimen-fiscal.store';
import { useUserProfileStore } from '../stores/user-profile.store';
import { useToast } from 'vue-toastification';
import { useLoadingView } from '@/modules/common/composables/useLoadingView';

const loadingView = useLoadingView()
const toast = useToast();

const options = ref<MaskInputOptions>({
  mask: 'AAAM-######-XXX',
  tokens: {
    A: {
      pattern: /[A-Z]/,
      transform: (chr) => chr.toUpperCase(),
    },
    M: {
      pattern: /[A-Z]/,
      optional: true,
      transform: (chr) => chr.toUpperCase(),
    },
    X: {
      pattern: /[A-Z0-9]/,
      transform: (chr) => chr.toUpperCase(),
    },
  },
});

const userProfileStore = useUserProfileStore();
const regimenFiscalStore = useRegimenFiscalStore();

const validationSchema = toTypedSchema(
  zod.object({
    rfc: zod
      .string({message: 'Porfavor ingrese su RFC'})
      .refine((val) => {
        if (val.length === 12 && RegExp(rfcPMRegex).test(val)) return true;
        else if (val.length === 13 && RegExp(rfcPFRegex).test(val)) return true;
        else return false;
      },
      { message: 'El RFC no tiene el formato correcto' },
    ),
    nombreFiscal: zod
      .string({message: 'Porfavor ingrese el nombre fiscal'})
      .min(1, {message: 'Porfavor ingrese el nombre fiscal'})
      .max(50, {message: 'El nombre fiscal no puede contener mas de 50 letras'}),
    regimenFiscalId: zod.number({message: 'Porfavor seleccione su régimen fiscal'}),
  }),
);

const { handleSubmit, resetForm } = useForm({
  validationSchema,
  keepValuesOnUnmount: true
});

const onSubmit = handleSubmit(async (values) => {
  loadingView.setIsLoading(true);
  const response = await userProfileStore.saveFiscalData(values)

  if(!response.success) toast.error(response.message);

  toast.success('La información fiscal se guardó correctamente');
  loadingView.setIsLoading(false);
});


onMounted(async ()=> {
  loadingView.setIsLoading(true);
  resetForm({values: {
    rfc: userProfileStore.persona?.rfc,
    nombreFiscal: userProfileStore.persona?.nombreFiscal,
    regimenFiscalId: userProfileStore.persona?.regimenFiscal.id,
  }})
  loadingView.setIsLoading(false);
})

</script>
