<template>
  <div ref="profileMenu">
    <div
      id="userProfile"
      ref="userProfile"
      @click="onToggleClick"
      class="flex flex-row items-center justify-center md:justify-between bg-theme-interface-secondary rounded-full 
      h-full w-10 md:w-52 transition-all duration-200 hover:bg-theme-interface hover:cursor-pointer"
    >
      <span id="userProfileName" 
      class="hidden md:block text-theme-interface-secondary-foreground flex-1 text-center select-none transition-all duration-200">{{ authStore.fullName }}</span>
      <ProfileIcon id="userProfileIcon" class="fill-theme-interface-secondary-foreground w-9 h-9" />
    </div>
    <div
      v-if="toggleMenu"
      ref="floatingElement"
      :style="floatingStyles"
      class="flex flex-col gap-2 text-theme-interface-secondary-foreground w-[250px] z-30 bg-theme-interface-secondary rounded-lg p-4"
    >
      <button 
        @click="goToProfile" 
        class="w-full flex flex-row gap-4 rounded-md py-2 px-2 select-none 
        hover:bg-theme-interface transition-all duration-200 
        active:bg-theme-interface hover:cursor-pointer">
        <ProfileIcon class="fill-theme-interface-secondary-foreground w-6 h-6" />
        <span>Perfil</span>
      </button>
      <button 
        @click="showThemeCustomization"  
        class="w-full flex flex-row gap-4 rounded-md py-2 px-2 select-none 
        hover:bg-theme-interface transition-all duration-200 
        active:bg-theme-interface hover:cursor-pointer">
        <PaletteIcon class="fill-theme-interface-secondary-foreground w-6 h-6" />
        <span>Personalizar</span>
      </button>
      <button 
        @click="authStore.logout()"  
        class="w-full flex flex-row gap-4 rounded-md py-2 px-2 select-none 
        bg-red-500 hover:bg-red-400 transition-all duration-100 
        active:bg-red-600 hover:cursor-pointer">
        <LogoutIcon class="fill-theme-interface-secondary-foreground w-6 h-6" />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { autoUpdate, hide, offset, useFloating } from '@floating-ui/vue';
import { onClickOutside } from '@vueuse/core';

import ProfileIcon from '@/icons/ProfileIcon.vue';
import LogoutIcon from '@/icons/LogoutIcon.vue';
import PaletteIcon from '@/icons/PaletteIcon.vue';

import {useAuthStore} from '@/modules/auth/stores/auth.store';
import { useUserProfileStore } from '../../profile/stores/user-profile.store';

const userProfile = ref(null);
const floatingElement = ref(null);
const toggleMenu = ref(false)

const { floatingStyles } = useFloating(userProfile, floatingElement, {
  placement: 'bottom-end',
  middleware: [offset(5), hide()],
  whileElementsMounted: autoUpdate,
});

const onToggleClick = () => {
  toggleMenu.value = !toggleMenu.value;
}

const profileMenu = ref(null);
onClickOutside(profileMenu, () => {
  toggleMenu.value = false
})

const authStore = useAuthStore();
const userProfileStore = useUserProfileStore()

const showThemeCustomization = () => {
  userProfileStore.isCustomThemeVisible = !userProfileStore.isCustomThemeVisible;
  toggleMenu.value = false;
}

const goToProfile = () => {
  router.push({name: 'profile'})
  toggleMenu.value = false
}

</script>