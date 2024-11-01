import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { SaveFiscalDataRequest } from "../../interfaces/user-profile/save-fiscal-data.interface";
import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { EmisorProfile } from "../../interfaces/user-profile/user-profile.interface";
import type { SaveCommercialNameRequest } from "../../interfaces/user-profile/save-commercial-name.interface";


export const SaveCommercialNameAction = async(emisorId: number, saveCommercialName: SaveCommercialNameRequest):Promise<SchemaResponse<EmisorProfile> | SchemaResponse<any>>  => {
  try {
    const {data} = await cfdiOkApi.post<SchemaResponse<EmisorProfile>>(`/emisors/${emisorId}/profile/commercial-name`, saveCommercialName)
    return data;
  } catch (error) {
    return generalException(error);
  }
}