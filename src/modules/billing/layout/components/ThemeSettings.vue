<template>
  <aside
    class="bg-zinc-100 fixed right-0 z-30 h-[calc(100%-3.5rem)] transition-all ease-in-out duration-300 shadow-2xl overflow-y-auto"
    :class="{
      'w-0': !visible,
      'w-80': visible,
    }"
    aria-label="Sidebar"
  >
    <div
      ref="themeSettingsRef"
      class="flex flex-col gap-2 p-4"
    >
      <div class="flex flex-row justify-start">
        <CloseIcon
          aria-label="Close modal"
          class="fill-black hover:cursor-pointer h-6 w-6"
          @click="$emit('close')"
        />
      </div>
      <div class="h-18 bg-white rounded-lg p-2 flex flex-col gap-2 shadow-md border">
        <p class="text-xs list-item ml-4">Medida recomendada de 264 x 48 pixeles</p>
        <p class="text-xs list-item ml-4">Peso menor a 2 MB</p>
        <img
          class="h-12 object-contain w-auto"
          :src="logoSrc"
        />

        <input
          ref="uploadLogoInput"
          type="file"
          class="hidden"
          accept="image/*"
          @change="handlePreviewLogo"
        />
        <button
          v-if="newLogo"
          type="button"
          class="btn-secondary p-0 w-full justify-items-end"
          @click="handleCancelLogoUpload"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="p-0 w-full justify-items-end"
          :class="{
            'btn-secondary': !newLogo,
            'btn-primary': newLogo
          }"
          @click="handleSaveLogo"
        >
          {{ !newLogo ? 'Subir Logotipo' : 'Guardar' }}
        </button>
      </div>
      <div
        v-for="(section, indexSection) in themeSections"
        class="bg-white rounded-md shadow-md border transition-all ease-linear duration-300"
        :class="{
          'h-10 transition-all ease-linear duration-300': !section.isActive,
        }"
      >
        <div
          class="flex flex-row justify-between items-center p-2 hover:cursor-pointer"
          @click="handleCollapseSection(indexSection)"
        >
          <span class="flex-1 text-center select-none">{{ section.name }}</span>
          <ArrowDown
            class="h-6 w-6 fill-black"
            :class="{
              'rotate-180': !section.isActive,
            }"
          />
        </div>
        <ul v-for="(color, indexColor) in section.colors">
          <li
            class="flex flex-row px-2 py-2 gap-4 transition-all ease-linear duration-300"
            :class="{
              'hidden h-0': !section.isActive,
            }"
          >
            <input
              type="color"
              :value="color.value"
              :key="color.name + '-' + indexColor"
              @input="handleChangeColor(indexSection, indexColor, $event)"
              class="w-6 h-6 rounded-full border border-slate-300 hover:cursor-pointer"
            />
            <span>{{ color.name }}</span>
          </li>
        </ul>
      </div>
      <button
        type="button"
        class="btn-primary p-0 w-full justify-items-end"
        @click="onSubmit"
      >
        Guardar cambios
      </button>
      <button
        type="button"
        class="btn-secondary p-0"
        @click="onReset"
      >
        Restablecer
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watchEffect } from 'vue';
import ArrowDown from '@/icons/ArrowDown.vue';
import CloseIcon from '@/icons/CloseIcon.vue';
import { defaultTheme, type Theme } from '../interfaces/theme.interface';
import { useTheme } from '../composable/useTheme';
import { useUserProfileStore } from '../../profile/stores/user-profile.store';
import { useToast } from 'vue-toastification';
import { useLoadingView } from '@/modules/common/composables/useLoadingView';
import cfdiOkLogo from '@/assets/images/cfdiOk.png'

interface Props {
  visible: boolean;
}

withDefaults(defineProps<Props>(), {
  visible: false,
});

const emits = defineEmits(['close']);
const { getTheme, applyTheme } = useTheme();
const themeSettings = ref<Theme>(getTheme.value);
const userProfileStore = useUserProfileStore();
const loadingView = useLoadingView();
const toast = useToast();
const uploadLogoInput = useTemplateRef('uploadLogoInput');
const newLogo = ref()
const newLogoFile = ref()

const logoSrc = computed(()=>{
  if(newLogo.value) return newLogo.value;
  else if(userProfileStore.userProfile.preferencias?.logo_url) return userProfileStore.userProfile.preferencias?.logo_url;
  else return cfdiOkLogo;
})

const themeSections = ref<any[]>([]);

watchEffect(() => {
  themeSettings.value = getTheme.value;
  themeSections.value = themeSettings.value.themeSections.map((themeSection) => {
    return {
      ...themeSection,
      isActive: false,
    };
  });
});

const handleCollapseSection = (index: number) => {
  themeSections.value[index].isActive = !themeSections.value[index].isActive;
};

const handleChangeColor = (indexSection: number, indexColor: number, event: any) => {
  if (!event.target?.value) {
    toast.error('Error en seleccion de color');
    return;
  }

  const value = event.target?.value;
  themeSettings.value.themeSections[indexSection].colors[indexColor].value = value;
  const cssVar = themeSettings.value.themeSections[indexSection].colors[indexColor].cssVar;
  document.documentElement.style.setProperty(cssVar, value);
};

const onSubmit = async () => {
  loadingView.isLoading = true;
  const response = await userProfileStore.saveEmisorTheme(themeSettings.value);
  if (!response.success) {
    toast.error(response.message);
  }
  loadingView.isLoading = false;
};

const onReset = async () => {
  themeSettings.value = defaultTheme;
  applyTheme(defaultTheme);
};

const handlePreviewLogo = (event: Event) => {
  event.preventDefault();
  if(uploadLogoInput.value?.files?.length) {
    const file = uploadLogoInput.value?.files[0];

    if(file.size > 2 * 1024 * 1024){
      toast.error('La imagen no debe pesar más de 2 MB')
      return;
    }
    newLogoFile.value = uploadLogoInput.value?.files[0];
    newLogo.value = URL.createObjectURL(newLogoFile.value);
  }
};

const handleCancelLogoUpload = () => {
  newLogo.value = null;
  newLogoFile.value = null;
}

const handleSaveLogo = async () => {
  if(!newLogo.value) {
    uploadLogoInput.value?.click();
    return;
  }

  loadingView.isLoading = true;
  const response = await userProfileStore.saveEmisorLogo(newLogoFile.value);

  if(!response.success) {
    toast.error(response.message);
    loadingView.isLoading = false;
    return;
  }

  newLogo.value = null;
  newLogoFile.value = null;
  loadingView.isLoading = false;
}

</script>

<style>
input[type='color'] {
  -webkit-appearance: none;
}
input[type='color']::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type='color']::-webkit-color-swatch {
  border: none;
}
</style>
