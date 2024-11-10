import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { CsdCredentials } from "../interfaces/get-csd-credentials.interface";


export const GetCsdCredentialsAction = async (id: number): Promise<SchemaResponse<CsdCredentials>> => {
  try {
    const {data} = await cfdiOkApi.get<SchemaResponse<CsdCredentials>>(`/emisors/${id}/profile/csd-credentials`);

    return data;
  } catch (error) {
    return generalException(error);
  }
}