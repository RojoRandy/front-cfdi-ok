import type { SignInResponse } from '../interfaces';
import { cfdiOkApi } from '@/api/cfdiOkApi';
import type { SchemaResponse } from '@/modules/common/interfaces/api-schema-response';
import { isAxiosError } from 'axios';
import type { RegisterRequest } from '../interfaces/register.request';

export const RegisterAction = async (
  registerRequest: RegisterRequest
): Promise<SchemaResponse<SignInResponse> | SchemaResponse<any>> => {
  try {
    const { data } = await cfdiOkApi.post<SchemaResponse<SignInResponse>>('/auth/register', registerRequest);

    return data
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
      return {
        message: error.response?.data.description,
        success: false,
        data: undefined,
      };
    } else {
      throw new Error(
        'No se pudo realizar la petición, por favor intente de nuevo',
      );
    }
  }
};
