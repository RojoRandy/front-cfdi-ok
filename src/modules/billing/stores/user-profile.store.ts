import { defineStore } from "pinia";
import { GetEmisorProfileAction } from "../actions/user-profile/get-emisor-profile.action";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import type { EmisorProfile } from "../interfaces/user-profile/user-profile.interface";
import { computed, ref } from "vue";
import type { ResponseDto } from "@/modules/common/interfaces/api-schema-response";
import { lackConnectionErrorResponse } from "@/modules/common/error/general.exception";
import { SaveFiscalDataAction } from "../actions/user-profile/save-fiscal-data.action";
import type { SaveFiscalDataRequest } from "../interfaces/user-profile/save-fiscal-data.interface";
import type { SaveCommercialNameRequest } from "../interfaces/user-profile/save-commercial-name.interface";
import { SaveCommercialNameAction } from "../actions/user-profile/save-commercial-name.action";
import type { SaveFiscalAddressRequest } from "../interfaces/user-profile/save-fiscal-address.interface";
import { SaveFiscalAddressAction } from "../actions/user-profile/save-fiscal-address.action";


export const useUserProfileStore = defineStore('useUserProfileStore', ()=> {
  const authStore = useAuthStore();
  const userProfile = ref<EmisorProfile>()
  
  const getUserProfile = async (): Promise<ResponseDto> => {
    try {
      const response = await GetEmisorProfileAction(authStore.emisorId);

      if(!response.success){
        return {
          success: false,
          message: response.message
        };
      }

      userProfile.value = response.data;
      return response;
    } catch (error) {
      return lackConnectionErrorResponse;
    }
  }

  const saveFiscalData = async (fiscalDataRequest: SaveFiscalDataRequest): Promise<ResponseDto> => {
    try {
      const response = await SaveFiscalDataAction(authStore.emisorId, fiscalDataRequest);

      if(!response.success){
        return {
          success: false,
          message: response.message
        };
      }
      
      userProfile.value = response.data;
      return response
    } catch (error) {
      return lackConnectionErrorResponse;
    }
  }

  const saveCommercialName = async (commercialNameRequest: SaveCommercialNameRequest): Promise<ResponseDto> => {
    try {
      const response = await SaveCommercialNameAction(authStore.emisorId, commercialNameRequest);
      
      if(!response.success){
        return {
          success: false,
          message: response.message
        };
      }
      
      userProfile.value = response.data;
      return response;
    } catch (error) {
      return lackConnectionErrorResponse;
    }
  }

  const saveFiscalAddress = async (fiscalAddressRequest: SaveFiscalAddressRequest): Promise<ResponseDto> => {
    try {
      const response = await SaveFiscalAddressAction(authStore.emisorId, fiscalAddressRequest);

      if(!response.success){
        return {
          success: false,
          message: response.message
        };
      }
      
      userProfile.value = response.data;
      return response
    } catch (error) {
      return lackConnectionErrorResponse;
    }
  }
  

  return {
    userProfile,
    //Getter
    persona: computed(()=> userProfile.value?.persona),
    nombreComercial: computed(() => userProfile.value?.nombreComercial),

    //Actions
    getUserProfile,
    saveFiscalData,
    saveCommercialName,
    saveFiscalAddress
  }
}) 