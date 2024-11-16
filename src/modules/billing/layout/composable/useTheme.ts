import { computed } from "vue";
import { useUserProfileStore } from "../../profile/stores/user-profile.store"
import { defaultTheme, type Theme } from "../interfaces/theme.interface";

export const useTheme = () => {
  const userProfileStore = useUserProfileStore();

  const getTheme = computed(()=> {
    return userProfileStore.userProfile.preferencias?.theme ?? defaultTheme;
  })

  const applyTheme = (theme: Theme)=> {
    for (const section of theme.themeSections) {
      for (const color of section.colors) {
        document.documentElement.style.setProperty(color.cssVar, color.value);
      }
    }
  }

  return {
    getTheme,
    applyTheme
  }
}