import { defineStore } from "pinia";
import { GetEmisorProfileAction } from "../actions/get-emisor-profile.action";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import type { EmisorProfile } from "../interfaces/user-profile.interface";
import { computed, ref } from "vue";
import type { ResponseDto } from "@/modules/common/interfaces/api-schema-response";
import { lackConnectionErrorResponse } from "@/modules/common/error/general.exception";
import { SaveFiscalDataAction } from "../actions/save-fiscal-data.action";
import type { SaveFiscalDataRequest } from "../interfaces/save-fiscal-data.interface";
import type { SaveCommercialNameRequest } from "../interfaces/save-commercial-name.interface";
import { SaveCommercialNameAction } from "../actions/save-commercial-name.action";
import type { SaveFiscalAddressRequest } from "../interfaces/save-fiscal-address.interface";
import { SaveFiscalAddressAction } from "../actions/save-fiscal-address.action";
import type { SaveUserInfoRequest } from "../interfaces/save-account-info.interface";
import { SaveUserInfoAction } from "../actions/save-account-info.action";
import { UpdateUserPasswordAction } from "../actions/update-user-password.action";
import type { UpdateUserPasswordRequest } from "../interfaces/update-user-password.interface";


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
  
  const saveUserInfo = async (userInfoRequest: SaveUserInfoRequest): Promise<ResponseDto> => {
    try {
      const response = await SaveUserInfoAction(authStore.emisorId, userInfoRequest);

      if(!response.success){
        return {
          success: false,
          message: response.message
        };
      }
      
      userProfile.value = response.data;
      await authStore.checkAuthStatus();
      return response
    } catch (error) {
      return lackConnectionErrorResponse;
    }
  }
  
  
  const updateUserPassword = async (passwordRequest: UpdateUserPasswordRequest): Promise<ResponseDto> => {
    try {
      const response = await UpdateUserPasswordAction(authStore.emisorId, passwordRequest);

      if(!response.success){
        return {
          success: false,
          message: response.message
        };
      }
      
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
    saveFiscalAddress,
    saveUserInfo,
    updateUserPassword,
  }
}) 