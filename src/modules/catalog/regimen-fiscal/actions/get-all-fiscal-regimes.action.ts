import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { RegimenFiscal } from "../interfaces/regimen-fiscal.interface";
import { cfdiOkApi } from "@/api/cfdiOkApi";
import { isAxiosError } from "axios";

export const getAllFiscalRegimesAction = async (): Promise<SchemaResponse<RegimenFiscal[]> | SchemaResponse<any>> => {
  
  try {
    const {data} = await cfdiOkApi.get<SchemaResponse<RegimenFiscal[]>>('/catalogs/regimen-fiscal');
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
      return {
        message: error.response?.data.description,
        success: false,
        data: undefined,
      };
    } else {
      throw new Error(
        'No se pudo realizar la petición, por favor intente de nuevo',
      );
    }
  }
}