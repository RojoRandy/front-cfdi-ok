import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { SaveMailSenderRequest } from "../interfaces/save-mail-sender.interface";


const SaveMailSenderAction = async(userId: number, request: SaveMailSenderRequest): Promise<SchemaResponse<any>> => {
  try {
    const {data} = await cfdiOkApi.post<SchemaResponse<any>>(`/mail-sender/${userId}`, request);
    return data;
  } catch (error) {
    return generalException(error);
  }
}

export default SaveMailSenderAction;