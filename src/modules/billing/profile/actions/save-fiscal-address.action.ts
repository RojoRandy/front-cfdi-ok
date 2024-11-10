import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { EmisorProfile } from "../interfaces/user-profile.interface";
import type { SaveFiscalAddressRequest } from "../interfaces/save-fiscal-address.interface";


export const SaveFiscalAddressAction = async(emisorId: number, saveFiscalAddressRequest: SaveFiscalAddressRequest):Promise<SchemaResponse<EmisorProfile> | SchemaResponse<any>>  => {
  try {
    const {data} = await cfdiOkApi.patch<SchemaResponse<EmisorProfile>>(`/emisors/${emisorId}/profile/fiscal-address`, saveFiscalAddressRequest)
    return data;
  } catch (error) {
    return generalException(error);
  }
}