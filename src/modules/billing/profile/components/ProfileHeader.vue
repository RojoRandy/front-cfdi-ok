<template>
  <div class="flex flex-col items-center md:items-start mt-4 mb-6 md:my-0">
    <!-- Perfil de empresa -->
    <div class="m-2 md:mx-8 my-4">
      <h1 class="text-xl font-semibold">Perfil de la empresa</h1>
      <p class="text-sm text-theme-text-paragraph">Actualiza el logo y los detalles de tu empresa aquí</p>
    </div>

    <!-- Nombre comercial -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 justify-items-center m-2 md:mx-8 my-2 "
    >
      <div class="flex flex-col w-full justify-center md:justify-start gap-2 px-8 md:p-0 my-2">
        <div class="flex flex-row gap-2">
          <textarea
            id="nombreComercial"
            name="nombreComercial"
            ref="commercialNameRef"
            class="text-md flex-1 md:text-xl h-20 md:h-10 font-semibold disabled:bg-white resize-none border-b-2 overflow-hidden"
            type="text"
            maxlength="100"
            @input="resize"
            disabled
            placeholder="Ingresa el nombre comercial de la persona o empresa que emite las facturas"
            v-model="nombreComercial"
          ></textarea>
          <button
            v-if="isEditing"
            type="button"
            @click="onSaveCommercialName"
          >
            <SaveIcon class="fill-theme-interface-secondary w-6 h-6 hover:cursor-pointer hover:fill-theme-interface" />
          </button>
          <button
            v-else
            type="button"
            @click="onEditComercialName"
          >
            <EditIcon class="fill-theme-interface-secondar w-6 h-6 hover:cursor-pointer hover:fill-theme-interface" />
          </button>
        </div>
        <span class="text-sm text-theme-text-paragraph">Nombre comercial de la persona o empresa que emite las facturas </span>
      </div>
    </div>
    <span class="text-sm text-theme-text-paragraph px-8 my-2">Los campos con un asterisco <span class="text-red-500">*</span> son necesarios para poder generar tus facturas electrónicas</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EditIcon from '@/icons/EditIcon.vue';
import SaveIcon from '@/icons/SaveIcon.vue';
import { useUserProfileStore } from '../stores/user-profile.store';
import { useToast } from 'vue-toastification';

const userProfileStore = useUserProfileStore()
const nombreComercial = ref<string>(userProfileStore.nombreComercial ?? '')
const toast = useToast();

const commercialNameRef = ref<HTMLTextAreaElement>();
const isEditing = ref(false);
const onEditComercialName = () => {
  isEditing.value = true;
  commercialNameRef.value!.disabled = false;
  commercialNameRef.value!.focus();
};

const onSaveCommercialName = async() => {
  if(nombreComercial.value === '') {
    nombreComercial.value = userProfileStore.nombreComercial ?? '';
    return;
  }

  const response = await userProfileStore.saveCommercialName({
    nombreComercial: nombreComercial.value
  });
  
  if(!response.success) toast.error(response.message);

  toast.success('El nombre comercial se guardó correctamente');
  commercialNameRef.value!.disabled = true;
  isEditing.value = false;
};

const resize = () => {
  commercialNameRef.value!.style.height = '18px';
  commercialNameRef.value!.style.height = commercialNameRef.value!.scrollHeight + 'px';
};

onMounted(() => {
  nombreComercial.value = userProfileStore.nombreComercial ?? '';
  resize();
});
</script>
