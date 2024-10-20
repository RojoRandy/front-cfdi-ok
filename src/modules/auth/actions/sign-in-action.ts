import { type SignInResponse } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';
import type { SchemaResponse } from '@/modules/common/interfaces/api-schema-response';
import { cfdiOkApi } from '@/api/cfdiOkApi';

export const SignInAction = async (
  email: string,
  password: string,
): Promise<SchemaResponse<SignInResponse> | SchemaResponse<any>> => {
  try {
    console.log('LOGIN')
    const { data: response } = await cfdiOkApi.post<
      SchemaResponse<SignInResponse>
    >('/auth/sign-in', {
      email,
      password,
    });

    return response;
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
