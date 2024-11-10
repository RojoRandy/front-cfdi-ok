import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { SaveFiscalDataRequest } from "../interfaces/save-fiscal-data.interface";
import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { EmisorProfile } from "../interfaces/user-profile.interface";
import type { SaveCommercialNameRequest } from "../interfaces/save-commercial-name.interface";


export const SaveCommercialNameAction = async(emisorId: number, saveCommercialName: SaveCommercialNameRequest):Promise<SchemaResponse<EmisorProfile> | SchemaResponse<any>>  => {
  try {
    const {data} = await cfdiOkApi.patch<SchemaResponse<EmisorProfile>>(`/emisors/${emisorId}/profile/commercial-name`, saveCommercialName)
    return data;
  } catch (error) {
    return generalException(error);
  }
}