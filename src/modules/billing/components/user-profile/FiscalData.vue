<template>
  <div
    v-if="loading"
    class="w-full flex flex-col items-center justify-center h-[200px]"
  >
    <Loading />
  </div>
  <form
    v-else
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
        :disabled="loading"
      >
        Guardar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import MaskInput from '@/modules/common/components/MaskInput.vue';
import type { MaskInputOptions } from 'maska';

import SelectInput from '@/modules/common/components/SelectInput.vue';
import TextInput from '@/modules/common/components/TextInput.vue';
import Loading from '@/modules/common/components/Loading.vue';

import { rfcPFRegex, rfcPMRegex } from '@/modules/common/utils/regex';
import { useRegimenFiscalStore } from '@/modules/catalog/regimen-fiscal/stores/regimen-fiscal.store';
import { useUserProfileStore } from '../../stores/user-profile.store';

const loading = ref(false);

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
  loading.value = true;
  const response = await userProfileStore.saveFiscalData(values)

  if(!response.success) console.log(response.message);
  loading.value = false;
});


onMounted(async ()=> {
  loading.value = true;
  await userProfileStore.getUserProfile();
  await regimenFiscalStore.getAllFiscalRegimes();
  
  resetForm({values: {
    nombreFiscal: userProfileStore.persona?.nombreFiscal,
    rfc: userProfileStore.persona?.rfc,
    regimenFiscalId: userProfileStore.persona?.regimenFiscal.id,
  }})
  loading.value = false;

})

</script>
