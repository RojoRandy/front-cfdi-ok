import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";


export const SaveCsdPublicKeyFileAction = async (id: number, publicKey: any): Promise<SchemaResponse<any>> => {
  try {
    let formData = new FormData();
    formData.append('llavePublica', publicKey)
    const {data} = await cfdiOkApi.patch<SchemaResponse<any>>(`/emisors/${id}/profile/csd-public-key`, formData);

    return data;
  } catch (error) {
    return generalException(error);
  }
}