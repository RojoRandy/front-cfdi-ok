<template>
  <div class="sticky z-40 top-0 bg-white h-14 shadow-md">
    <div class="h-full flex flex-row justify-between py-2 px-2">
      <div class="flex flex-row gap-4 items-center">
        <button
          type="button"
          @click="$emit('toggleSidebar')"
          class="rounded-lg px-2 py-1 hover:bg-slate-300 hover:bg-opacity-70"
        >
          <MenuSidebar class="fill-theme-icons w-[30px] h-[30px]" />
        </button>
        <img class="h-12 w-[200px] md:w-[264px] object-contain" :src="logoSrc">
      </div>
      <ProfileMenu />
    </div>
  </div>

</template>

<script setup lang="ts">
import MenuSidebar from '@/icons/SidebarIcon.vue';
import ProfileMenu from './ProfileMenu.vue';
import { useUserProfileStore } from '../../profile/stores/user-profile.store';
import { computed } from 'vue';
import cfdiOkLogo from '@/assets/images/cfdiOk.png'


defineEmits(['toggleSidebar']);
const userProfileStore = useUserProfileStore()

const logoSrc = computed(()=>{
  if(userProfileStore.userProfile.preferencias?.logo_url) return userProfileStore.userProfile.preferencias?.logo_url;
  else return cfdiOkLogo;
})

</script>
