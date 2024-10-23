<template>
  <div
    ref="userProfile"
    @click="toggleMenu = !toggleMenu"
    class="flex flex-row items-center justify-between bg-slate-800 rounded-full h-full w-52 transition-all duration-200 hover:bg-cyan-600 hover:cursor-pointer"
  >
    <span class="text-white flex-1 text-center select-none">Randy Rojo</span>
    <ProfileIcon class="fill-white w-9 h-9 mr-1" />
  </div>
  <div
    v-if="toggleMenu"
    ref="floatingElement"
    :style="floatingStyles"
    class="flex flex-col gap-2 text-white w-[250px] z-30 bg-slate-800 rounded-lg p-4"
  >
    <RouterLink to="profile" class="w-full flex flex-row gap-4 rounded-md py-2 px-2 select-none hover:bg-slate-600 transition-all duration-200 active:bg-cyan-600 hover:cursor-pointer">
      <ProfileIcon class="fill-white w-6 h-6" />
      <span>Perfil</span>
    </RouterLink>
    <button @click="authStore.logout()"  class="w-full flex flex-row gap-4 rounded-md py-2 px-2 select-none bg-red-500 hover:bg-red-400 transition-all duration-100 active:bg-red-600 hover:cursor-pointer">
      <LogoutIcon class="fill-white w-6 h-6" />
      <span>Cerrar Sesión</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { autoUpdate, hide, offset, useFloating } from '@floating-ui/vue';
import { onClickOutside } from '@vueuse/core';

import ProfileIcon from '@/icons/ProfileIcon.vue';
import LogoutIcon from '@/icons/LogoutIcon.vue';

import {useAuthStore} from '@/modules/auth/stores/auth.store';


const userProfile = ref(null);
const floatingElement = ref(null);
const toggleMenu = ref(false)

const { floatingStyles } = useFloating(userProfile, floatingElement, {
  placement: 'bottom-end',
  middleware: [offset(5), hide()],
  whileElementsMounted: autoUpdate,
});

const authStore = useAuthStore();

onClickOutside(floatingElement, () => {
  toggleMenu.value = false
})
</script>