import { cfdiOkApi } from "@/api/cfdiOkApi"
import { generalException } from "@/modules/common/error/general.exception";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { Municipio } from "../interfaces/address.interface";


export const GetMunicipiosByPaisAction = async (estadoId: number): Promise<SchemaResponse<Municipio[]> | SchemaResponse<any>> => {
  try {
    const {data} = await cfdiOkApi.get<SchemaResponse<Municipio[]>>('catalogs/address/municipios',{
      params: {
        estadoId
      }
    });

    return data;
  } catch (error) {
    return generalException(error);
  }
} 