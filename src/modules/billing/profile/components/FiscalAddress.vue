<template>
  <div
    v-if="isLoading"
    class="w-full flex flex-col items-center justify-center h-[200px]"
  >
    <Loading />
  </div>
  <form
    v-else
    id="fiscalAddressForm"
    @submit="onSubmit"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 my-4"
  >
    <TextInput
      id="codigoPostal"
      name="codigoPostal"
      label="Código Postal"
      @onBlur="handleChangePostalCode"
      required
    />
    <TextInput
      ref="calleRef"
      id="calle"
      name="calle"
      label="Calle"
    />
    <TextInput
      id="numeroExterior"
      name="numeroExterior"
      label="Número Exterior"
    />
    <TextInput
      id="numeroInterior"
      name="numeroInterior"
      label="Número Interior"
    />
    <template v-if="colonias.length">
      <SelectInput
        id="colonia"
        name="colonia"
        label="Colonia"
        :options="colonias"
        optionValue="colonia"
        optionLabel="colonia"
        optionFilter="colonia"
        :disabled="!colonias.length"
      />
    </template>
    <template v-else>
      <TextInput
        id="colonia"
        name="colonia"
        label="Colonia"
      />
    </template>

    <SelectInput
      id="paisId"
      name="paisId"
      label="Pais"
      :options="paises"
      optionLabel="nombre"
      optionValue="id"
      optionFilter="nombre"
      :disabled="disableAddressByPostalCode"
      @change="handleChangePais"
    />
    
    <template v-if="values.paisId !== 0 && estados.length>0">
      <SelectInput
        id="estadoId"
        name="estadoId"
        label="Estado"
        :options="estados"
        optionLabel="nombre"
        optionValue="id"
        optionFilter="nombre"
        :disabled="disableAddressByPostalCode"
        @change="handleChangeEstado"
      />
    </template>
    <template v-else>
      <TextInput
        id="estadoNombre"
        name="estadoNombre"
        label="Estado"
        :disabled="disableAddressByPostalCode"
      />
    </template>
    
    <template v-if="values.estadoId !== 0 && municipios.length">
      <SelectInput
        id="municipioId"
        name="municipioId"
        label="Municipio"
        :options="municipios"
        optionLabel="nombre"
        optionValue="id"
        optionFilter="nombre"
        :disabled="disableAddressByPostalCode"
      />
    </template>
    <template v-else>
      <TextInput
        id="municipioNombre"
        name="municipioNombre"
        label="Municipio"
        :disabled="disableAddressByPostalCode"
      />
    </template>
    
    <TextInput
      id="localidad"
      name="localidad"
      label="Localidad"
    />

    <TextInput
      id="referencias"
      name="referencias"
      label="Referencias"
      class="md:col-span-2 lg:col-span-3"
    />
  </form>
  <div
    class="border-t-2 pt-2"
  >
    <div class="flex flex-row justify-center">
      <button
        form="fiscalAddressForm"
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
import { useAddress } from '@/modules/catalog/address/composables/useAddress';
import TextInput from '@/modules/common/components/TextInput.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import * as zod from 'zod';
import { type Estado, type Municipio, type Pais, type Persona } from '../interfaces/user-profile.interface';
import SelectInput from '@/modules/common/components/SelectInput.vue';
import { useUserProfileStore } from '../stores/user-profile.store';
import Loading from '@/modules/common/components/Loading.vue';
import { useToast } from 'vue-toastification';
import { useLoadingView } from '@/modules/common/composables/useLoadingView';

const loadingView = useLoadingView()
const userProfileStore = useUserProfileStore()
const {getPaises, getEstadosByPais, getMunicipiosByEstado, getAddressByPostalCode} = useAddress()
const paises = ref<Pais[]>([]);
const estados = ref<Estado[]>([]);
const municipios = ref<Municipio[]>([]);
const colonias = ref<any[]>([])
const disableAddressByPostalCode = ref(true);
const previousPostalCode = ref('');
const isLoading = ref(false);
const toast = useToast();

const validationSchema = toTypedSchema(
  zod.object({
    codigoPostal: zod
        .string({ message: 'El código postal es necesario para la facturación'})
        .min(5, { message: 'El código postal debe ser de almenos 5 numeros'}),
    calle: zod.string().optional(),
    numeroExterior: zod.string().optional(),
    numeroInterior: zod.string().optional(),
    colonia: zod.string().optional(),
    paisId: zod.number().optional(),
    estadoId: zod.number().optional(),
    estadoNombre: zod.string().optional(),
    municipioId: zod.number().optional(),
    municipioNombre: zod.string().optional(),
    localidad: zod.string().optional(),
    referencias: zod.string().optional(),
  }),
);

const { handleSubmit, resetForm, values } = useForm({
  validationSchema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit(async (values)=> {
  loadingView.setIsLoading(true);
  
  const response = await userProfileStore.saveFiscalAddress(values)

  if(!response.success) toast.error(response.message);
  
  toast.success('El domicilio fiscal se guardó correctamente');
  loadingView.setIsLoading(false);
})

const handleChangePostalCode = async (event: any) => {
  const postalCode = event.target.value;
  if(postalCode === '' || previousPostalCode.value === postalCode) return;
  previousPostalCode.value = postalCode;
  try {
    await handleLoadColonias(postalCode)
    const address = await getAddressByPostalCode(postalCode);
    colonias.value = address?.colonias.map((colonia, index)=>({colonia})) ?? [];
    
    if(!address || !address.colonias.length) {
      disableAddressByPostalCode.value = false;
      resetForm({
        values: {
          codigoPostal: address!.codigoPostal,
          paisId: 0,
          estadoId: 0,
          municipioId: 0
        }
      });
      return
    }
    
    await handleLoadEstados(address.pais.id);
    await handleLoadMunicipios(address.estado.id);
    resetForm({
      values: {
        codigoPostal: address!.codigoPostal,
        paisId: address?.pais.id || 0,
        estadoId: address?.estado.id || 0,
        municipioId: address?.municipio.id || 0
      }
    });
  } catch (error) {
    console.log(error);
  }
  
}

const handleChangePais = async (option: Pais) => {
  if(option){
    await handleLoadEstados(option.id!);
  }
}

const handleChangeEstado = async (option: Pais) => {
  if(option){
    await handleLoadMunicipios(option.id!);
  }
}

const handleLoadPaises = async() => {
  paises.value = await getPaises();
}

const handleLoadEstados = async(paisId: number) => {
  estados.value = await getEstadosByPais(paisId);
}

const handleLoadMunicipios = async(estadoId: number)=> {
  municipios.value = await getMunicipiosByEstado(estadoId);
}

const handleLoadColonias = async(codigoPostal: string) => {
  const address = await getAddressByPostalCode(codigoPostal);
  colonias.value = address?.colonias.map((colonia, index)=>({colonia})) ?? [];
}

const setInitialValues = async(persona: Persona) => {
  if(!persona) return;
  await handleLoadPaises();
  await handleLoadEstados(persona.pais.id!);
  await handleLoadMunicipios(persona.estado.id!);
  await handleLoadColonias(persona.codigoPostal);
  resetForm({
    values: {
      codigoPostal: persona.codigoPostal,
      calle: persona?.calle ?? '',
      numeroExterior: persona?.numeroExterior ?? '',
      numeroInterior: persona?.numeroInterior ?? '',
      colonia: persona?.colonia ?? '',
      paisId: persona?.pais.id ?? 0,
      estadoId: persona?.estado.id ?? 0,
      estadoNombre: persona?.estadoNombre ?? '',
      municipioId: persona?.municipio.id ?? 0,
      municipioNombre: persona?.municipioNombre ?? '',
      localidad: persona?.localidad ?? '',
      referencias: persona?.referencias ?? '',
    }
  })
}

onMounted(async()=> {
  loadingView.setIsLoading(true);
  await handleLoadPaises();
  await setInitialValues(userProfileStore.persona!);
  loadingView.setIsLoading(false);
})
</script>
