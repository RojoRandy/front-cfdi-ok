import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import { cfdiOkApi } from "@/api/cfdiOkApi";
import type { MailServer } from "../interfaces/mail-server.interface";
import { generalException } from "@/modules/common/error/general.exception";

const GetMailServersAction = async (): Promise<SchemaResponse<MailServer[]> | SchemaResponse<any>> => {
  try {
    const {data} = await cfdiOkApi.get<SchemaResponse<MailServer[]>>('/catalogs/mail-server');
    return data;
  } catch (error) {
    return generalException(error);
  }
}

export default GetMailServersAction;