import { cfdiOkApi } from "@/api/cfdiOkApi"
import { generalException } from "@/modules/common/error/general.exception";
import type { SchemaResponse } from "@/modules/common/interfaces/api-schema-response";
import type { Address } from "../interfaces/address.interface";


export const GetAddressByPostalCodeAction = async (codigoPostal: string): Promise<SchemaResponse<Address> | SchemaResponse<any>> => {
  try {
    const {data} = await cfdiOkApi.get<SchemaResponse<Address>>('catalogs/address',{
      params: {
        postalCode: codigoPostal
      }
    });

    return data;
  } catch (error) {
    return generalException(error);
  }
} 