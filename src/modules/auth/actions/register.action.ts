import { tesloApi } from '@/api/tesloApi';
import type { SignInResponse } from '../interfaces';
import { cfdiOkApi } from '@/api/cfdiOkApi';
import type { SchemaResponse } from '@/modules/common/interfaces/api-schema-response';
import { isAxiosError } from 'axios';

export const RegisterAction = async (
  email: string,
  password: string,
  confirm_password: string
): Promise<SchemaResponse<SignInResponse> | SchemaResponse<any>> => {
  try {
    const { data } = await cfdiOkApi.post<SchemaResponse<SignInResponse>>('/auth/registration', {
      email,
      password,
      confirm_password
    });

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
