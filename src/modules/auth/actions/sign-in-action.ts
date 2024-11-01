import { type SignInResponse } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';
import type { SchemaResponse } from '@/modules/common/interfaces/api-schema-response';
import { cfdiOkApi } from '@/api/cfdiOkApi';
import { generalException } from '@/modules/common/error/general.exception';

export const SignInAction = async (
  email: string,
  password: string,
): Promise<SchemaResponse<SignInResponse> | SchemaResponse<any>> => {
  try {
    const { data: response } = await cfdiOkApi.post<
      SchemaResponse<SignInResponse>
    >('/auth/sign-in', {
      email,
      password,
    });

    return response;
  } catch (error) {
    return generalException(error);
  }
};
