import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { CsdCredentials } from "../interfaces/get-csd-credentials.interface";
import type { SaveCsdCredentialsRequest } from "../interfaces/save-csd-credentials.interface";


export const SaveCsdCredentialsAction = async (id: number, request: SaveCsdCredentialsRequest): Promise<SchemaResponse<any>> => {
  try {
    const {data} = await cfdiOkApi.patch<SchemaResponse<any>>(`/emisors/${id}/profile/csd-credentials`, request);

    return data;
  } catch (error) {
    return generalException(error);
  }
}