<template>
  <div ref="profileMenu">
    <div
      id="userProfile"
      ref="userProfile"
      @click="onToggleClick"
      class="flex flex-row items-center justify-between bg-slate-800 rounded-full h-full w-52 transition-all duration-200 hover:bg-cyan-600 hover:cursor-pointer"
    >
      <span id="userProfileName" class="text-white flex-1 text-center select-none">Randy Rojo</span>
      <ProfileIcon id="userProfileIcon" class="fill-white w-9 h-9 mr-1" />
    </div>
    <div
      v-if="toggleMenu"
      ref="floatingElement"
      :style="floatingStyles"
      class="flex flex-col gap-2 text-white w-[250px] z-30 bg-slate-800 rounded-lg p-4"
    >
      <button @click="goToProfile" class="w-full flex flex-row gap-4 rounded-md py-2 px-2 select-none hover:bg-slate-600 transition-all duration-200 active:bg-cyan-600 hover:cursor-pointer">
        <ProfileIcon class="fill-white w-6 h-6" />
        <span>Perfil</span>
      </button>
      <button @click="authStore.logout()"  class="w-full flex flex-row gap-4 rounded-md py-2 px-2 select-none bg-red-500 hover:bg-red-400 transition-all duration-100 active:bg-red-600 hover:cursor-pointer">
        <LogoutIcon class="fill-white w-6 h-6" />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { autoUpdate, hide, offset, useFloating } from '@floating-ui/vue';
import { onClickOutside } from '@vueuse/core';

import ProfileIcon from '@/icons/ProfileIcon.vue';
import LogoutIcon from '@/icons/LogoutIcon.vue';

import {useAuthStore} from '@/modules/auth/stores/auth.store';
import router from '@/router';

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

const goToProfile = () => {
  router.push({name: 'profile'})
  toggleMenu.value = false
}

</script>