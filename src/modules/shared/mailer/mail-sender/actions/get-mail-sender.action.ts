import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { MailSender } from "../interfaces/mail-sender.interface";


const GetMailSenderAction = async(userId: number): Promise<SchemaResponse<MailSender>> => {
  try {
    const {data} = await cfdiOkApi.get<SchemaResponse<MailSender>>(`/mail-sender/${userId}`);
    return data;
  } catch (error) {
    return generalException(error);
  }
}

export default GetMailSenderAction;