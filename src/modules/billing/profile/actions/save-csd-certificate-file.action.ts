import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";


export const SaveCsdCertificateFileAction = async (id: number, certificate: any): Promise<SchemaResponse<any>> => {
  try {
    let formData = new FormData();
    formData.append('certificado', certificate)
    const {data} = await cfdiOkApi.patch<SchemaResponse<any>>(`/emisors/${id}/profile/csd-certificate`, formData);

    return data;
  } catch (error) {
    return generalException(error);
  }
}