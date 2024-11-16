import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";
import type { Theme } from "../../layout/interfaces/theme.interface";
import type { EmisorProfile } from "../interfaces/user-profile.interface";


export const SaveEmisorThemeAction = async(emisorId: number, theme: Theme):Promise<SchemaResponse<EmisorProfile> | SchemaResponse<any>>  => {
  try {
    const {data} = await cfdiOkApi.patch<SchemaResponse<EmisorProfile>>(`/emisors/${emisorId}/profile/preferences/theme`, {
      id: emisorId,
      theme
    })
    return data;
  } catch (error) {
    return generalException(error);
  }
}