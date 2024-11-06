import { cfdiOkApi } from "@/api/cfdiOkApi"
import { generalException } from "@/modules/common/error/general.exception";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { Pais } from "../interfaces/address.interface";


export const GetPaisesAction = async (): Promise<SchemaResponse<Pais> | SchemaResponse<any>> => {
  try {
    const {data} = await cfdiOkApi.get<SchemaResponse<Pais[]>>('catalogs/address/paises');

    return data;
  } catch (error) {
    return generalException(error);
  }
} 