import { defineStore } from "pinia"
import { ref } from "vue"

export const useLoadingView = defineStore('useLoadingView', ()=> {
  const isLoading = ref(false);

  const setIsLoading = (value: boolean) => {
    isLoading.value = value;
  }

  return {
    isLoading,
    setIsLoading
  }
})