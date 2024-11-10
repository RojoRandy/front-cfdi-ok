import { cfdiOkApi } from "@/api/cfdiOkApi"
import { generalException } from "@/modules/common/error/general.exception";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { Estado } from "../interfaces/address.interface";


export const GetEstadosByPaisAction = async (paisId: number): Promise<SchemaResponse<Estado[]> | SchemaResponse<any>> => {
  try {
    const {data} = await cfdiOkApi.get<SchemaResponse<Estado[]>>('catalogs/address/estados',{
      params: {
        paisId
      }
    });

    return data;
  } catch (error) {
    return generalException(error);
  }
} 