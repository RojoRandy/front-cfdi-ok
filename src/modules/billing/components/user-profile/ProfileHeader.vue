<template>
  <div class="flex flex-col-reverse md:flex-col items-center md:items-start mt-4 mb-6 md:my-0">
    <!-- Logo y Nombre comercial -->
    <div class="flex-1 md:flex-none md:relative h-0 md:h-48 w-full">
      <div class="h-0 md:h-32 w-full bg-slate-300"></div>
      <div class="flex flex-col md:flex-row items-center">
        <div
          class="md:absolute bottom-0 left-2 md:left-8 h-36 w-36 md:h-24 md:w-24 bg-cyan-700 rounded-full border-2 border-white"
        ></div>
        <div
          class="flex flex-row w-full items-end justify-center md:justify-start px-8 md:px-4 md:ml-32 md:left-32 gap-4 bottom-2 lg:bottom-8 left-28"
        >
          <textarea
            ref="commercialName"
            class="text-md flex-1 max-w-[400px] md:text-xl h-20 md:h-8 font-semibold disabled:bg-white resize-none border-b-2 overflow-hidden"
            type="text"
            maxlength="50"
            @input="resize"
            disabled
            value="Nombre comercial de la empresa"
          ></textarea>
          <button
            v-if="isEditing"
            type="button"
            @click="onSaveCommercialName"
          >
            <SaveIcon class="fill-black w-6 h-6 hover:cursor-pointer" />
          </button>
          <button
            v-else
            type="button"
            @click="onEditComercialName"
          >
            <EditIcon class="fill-black w-6 h-6 hover:cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
    <!-- Perfil de empresa -->
    <div class="m-2 md:mx-8 my-4">
      <h1 class="text-lg font-semibold">Perfil de la empresa</h1>
      <p class="text-sm text-slate-500">Actualiza el logo y los detalles de tu empresa aquí</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import EditIcon from '@/icons/EditIcon.vue';
import SaveIcon from '@/icons/SaveIcon.vue';

const commercialName = ref<HTMLTextAreaElement>();
const isEditing = ref(false);
const onEditComercialName = () => {
  isEditing.value = true;
  commercialName.value!.disabled = false;
  commercialName.value!.focus();
};

const onSaveCommercialName = () => {
  commercialName.value!.disabled = true;
  isEditing.value = false;
};

const resize = () => {
  commercialName.value!.style.height = '18px';
  commercialName.value!.style.height = commercialName.value!.scrollHeight + 'px';
};

onMounted(() => {
  resize();
});
</script>
