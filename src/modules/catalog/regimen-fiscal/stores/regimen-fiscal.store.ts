import { defineStore } from "pinia";
import { ref } from "vue";
import type { RegimenFiscal } from "../interfaces/regimen-fiscal.interface";
import { GetAllFiscalRegimesAction } from "../actions/get-all-fiscal-regimes.action";
import type { ResponseDto } from "@/modules/common/interfaces/api-schema-response";
import { lackConnectionErrorResponse } from "@/modules/common/error/general.exception";


export const useRegimenFiscalStore = defineStore('RegimenFiscalStore', ()=> {

  const fiscalRegimes = ref<RegimenFiscal[]>([])
  
  const getAllFiscalRegimes = async (): Promise<ResponseDto> => {

    try {
      const response = await GetAllFiscalRegimesAction();

      if(!response.success) {
        return {
          success: false,
          message: response.message
        }
      }

      const {data, ...rest } = response;
      fiscalRegimes.value = data;
      return rest;
    } catch (error) {
      return lackConnectionErrorResponse;
    }
  }

  return {
    fiscalRegimes,

    //Actions
    getAllFiscalRegimes
  }
})