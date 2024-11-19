import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { EmisorProfile } from "../interfaces/user-profile.interface";


export const SaveEmisorLogoAction = async(emisorId: number, logo: any):Promise<SchemaResponse<EmisorProfile> | SchemaResponse<any>>  => {
  try {
    let formData = new FormData();
    formData.append('logo', logo)
    const {data} = await cfdiOkApi.patch<SchemaResponse<EmisorProfile>>(`/emisors/${emisorId}/profile/preferences/logo`, formData)
    return data;
  } catch (error) {
    return generalException(error);
  }
}