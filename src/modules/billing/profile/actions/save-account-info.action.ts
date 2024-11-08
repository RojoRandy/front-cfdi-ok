import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { EmisorProfile } from "../interfaces/user-profile.interface";
import type { SaveUserInfoRequest } from "../interfaces/save-account-info.interface";


export const SaveUserInfoAction = async(emisorId: number, saveUserInfoRequest: SaveUserInfoRequest):Promise<SchemaResponse<EmisorProfile> | SchemaResponse<any>>  => {
  try {
    const {data} = await cfdiOkApi.patch<SchemaResponse<EmisorProfile>>(`/emisors/${emisorId}/profile/user-info`, saveUserInfoRequest)
    return data;
  } catch (error) {
    return generalException(error);
  }
}