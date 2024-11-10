import { ref } from "vue"

export const useLoadingView = () => {
  const isLoading = ref(false);

  const setIsLoading = (value: boolean) => {
    isLoading.value = value;
  }

  return {
    isLoading,
    setIsLoading
  }
}