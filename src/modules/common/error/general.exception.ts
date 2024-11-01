import { isAxiosError } from "axios";
import type { ResponseDto, SchemaResponse } from "../interfaces/api-schema-response";

export const lackConnectionErrorResponse: ResponseDto = {
  success: false,
  message: 'No se pudo realizar la petición, por favor intente de nuevo'
}

export const generalException = (error: any): SchemaResponse<any> => {
  if (isAxiosError(error)) {
    console.log(error);
    return {
      message: error.response?.data.description,
      success: false,
      data: undefined,
    };
  } else {
    throw error;
  }
}