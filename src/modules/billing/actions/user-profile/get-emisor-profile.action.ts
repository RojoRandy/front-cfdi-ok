import { cfdiOkApi } from "@/api/cfdiOkApi"
import type { EmisorProfile } from "../../interfaces/user-profile/user-profile.interface";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import { generalException } from "@/modules/common/error/general.exception";


export const GetEmisorProfileAction = async (id: number): Promise<SchemaResponse<EmisorProfile> | SchemaResponse<any>> => {
  try {
    const {data} = await cfdiOkApi.get<SchemaResponse<EmisorProfile>>(`/emisors/${id}/profile`);

    return data;
  } catch (error) {
    return generalException(error);
  }
}