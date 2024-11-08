import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { RegimenFiscal } from "../interfaces/regimen-fiscal.interface";
import { cfdiOkApi } from "@/api/cfdiOkApi";
import { generalException } from "@/modules/common/error/general.exception";

export const GetAllFiscalRegimesAction = async (): Promise<SchemaResponse<RegimenFiscal[]> | SchemaResponse<any>> => {
  try {
    const {data} = await cfdiOkApi.get<SchemaResponse<RegimenFiscal[]>>('/catalogs/regimen-fiscal');
    return data;
  } catch (error) {
    return generalException(error);
  }
}