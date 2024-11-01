import { defineStore } from "pinia";
import { ref } from "vue";
import type { RegimenFiscal } from "../interfaces/regimen-fiscal.interface";
import { getAllFiscalRegimesAction } from "../actions/get-all-fiscal-regimes.action";
import type { ResponseDto } from "@/modules/common/interfaces/api-schema-response";


export const useRegimenFiscalStore = defineStore('RegimenFiscalStore', ()=> {

  const fiscalRegimes = ref<RegimenFiscal[]>([])
  
  const getAllFiscalRegimes = async (): Promise<ResponseDto> => {

    try {
      const response = await getAllFiscalRegimesAction();

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
      return {
        success: false,
        message: 'No se pudo realizar la petición, por favor intente de nuevo'
      }
    }
  }

  return {
    fiscalRegimes,

    //Actions
    getAllFiscalRegimes
  }
})