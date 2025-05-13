<template>
  <div class="w-full flex flex-col gap-2 p-4">
    <div name="actions" class="flex flex-row justify-between">
      <span class="font-semibold flex gap-2 hover:cursor-pointer hover:bg-zinc-300 rounded-md px-2 select-none" >
        <ArrowLeft class="fill-black w-6 h-6" />
        Regresar
      </span>
      <span class="font-semibold flex gap-2 hover:cursor-pointer hover:bg-zinc-300 rounded-md px-2 select-none text-theme-destructive" >
        <DeleteIcon class="fill-theme-destructive w-6 h-6"/>
        Eliminar
      </span>
    </div>
    <div name="client-name" class="bg-white p-2 rounded-md drop-shadow">
      <span>Gabriel Manzanera</span>
    </div>

    <form @submit="onSubmit" class="flex flex-col gap-2">
      <!-- DATOS FISCALES -->
      <DetailSection class="detail">
        <template #summary>
          <div class="w-full flex flex-row justify-between">
            <div class="space-x-2">
              <span>Datos Fiscales</span>
              <span class="bg-theme-destructive text-white rounded-md px-2">* Obligatorios</span>
            </div>
            <CheckIcon class="w-6 h-6 fill-white bg-theme-success rounded-full"/>
          </div>
        </template>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
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
              class="md:col-span-2 z-[200]"
            />
          </div>
        </template>
      </DetailSection>

      <!-- INFORMACIÓN DE CONTACTO -->
      <DetailSection class="detail">
        <template #summary>
          <div class="w-full flex flex-row justify-between">
            <div class="space-x-2">
              <span>Información de contacto</span>
              <span class="bg-theme-destructive text-white rounded-md px-2">* Obligatorios</span>
            </div>
            <CheckIcon class="w-6 h-6 fill-white bg-theme-success rounded-full"/>
          </div>
        </template>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
            <TextInput
              id="email"
              name="email"
              label="Correo Electrónico"
              @onBlur="handleChangePostalCode"
              required
            />
            <TextInput
              id="telefono"
              name="telefono"
              label="Teléfono"
            />
          </div>
        </template>
      </DetailSection>

      <!-- DOMICILIO FISCAL -->
      <DetailSection class="detail">
        <template #summary>
          <div class="w-full flex flex-row justify-between">
            <div class="space-x-2">
              <span>Domicilio Fiscal</span>
              <span class="bg-theme-destructive text-white rounded-md px-2">* Obligatorios</span>
            </div>
            <CheckIcon class="w-6 h-6 fill-white bg-theme-success rounded-full"/>
          </div>
        </template>
        <template #content>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
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
              class="lg:col-span-3"
            />
          </div>
        </template>
      </DetailSection>
      
      <div name="client-name" class="bg-white p-2 rounded-md drop-shadow flex justify-center">
        <input type="submit" class="btn-primary" value="Guardar"/>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { MaskInputOptions } from 'maska';
import { onMounted, ref } from 'vue';
import * as zod from 'zod';
import { useToast } from 'vue-toastification';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';


import MaskInput from '@/modules/common/components/MaskInput.vue';
import CheckIcon from '@/icons/CheckIcon.vue';
import { useRegimenFiscalStore } from '@/modules/catalog/regimen-fiscal/stores/regimen-fiscal.store';
import DetailSection from '@/modules/common/components/DetailSection.vue';
import SelectInput from '@/modules/common/components/SelectInput.vue';
import TextInput from '@/modules/common/components/TextInput.vue';
import { useLoadingView } from '@/modules/common/composables/useLoadingView';
import type { Estado, Municipio, Pais, Persona } from '../../profile/interfaces/user-profile.interface';
import { useAddress } from '@/modules/catalog/address/composables/useAddress';
import { rfcPFRegex, rfcPMRegex } from '@/modules/common/utils/regex';
import ArrowLeft from '@/icons/ArrowLeft.vue';
import DeleteIcon from '@/icons/DeleteIcon.vue';

const loadingView = useLoadingView()
const toast = useToast();

const regimenFiscalStore = useRegimenFiscalStore();
const previousPostalCode = ref('');
const disableAddressByPostalCode = ref(true);
const {getPaises, getEstadosByPais, getMunicipiosByEstado, getAddressByPostalCode} = useAddress()
const paises = ref<Pais[]>([]);
const estados = ref<Estado[]>([]);
const municipios = ref<Municipio[]>([]);
const colonias = ref<any[]>([])

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

const onSubmit = handleSubmit(()=> {

})


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
  await regimenFiscalStore.getAllFiscalRegimes();
  await handleLoadPaises();
  // await setInitialValues();
  loadingView.setIsLoading(false);
})
</script>


<style>
detail:focus {
  @apply z-50;
}

detail {
  @apply z-0;
}
</style>