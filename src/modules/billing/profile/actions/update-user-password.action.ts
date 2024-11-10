import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { UpdateUserPasswordRequest } from "../interfaces/update-user-password.interface";


export const UpdateUserPasswordAction = async(emisorId: number, updateUserPasswordRequest: UpdateUserPasswordRequest):Promise<SchemaResponse<any>>  => {
  try {
    const {data} = await cfdiOkApi.patch<SchemaResponse<any>>(`/emisors/${emisorId}/profile/user-password`, updateUserPasswordRequest)
    return data;
  } catch (error) {
    return generalException(error);
  }
}