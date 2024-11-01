import type { SignInResponse } from '../interfaces';
import { cfdiOkApi } from '@/api/cfdiOkApi';
import type { SchemaResponse } from '@/modules/common/interfaces/api-schema-response';
import { isAxiosError } from 'axios';
import type { RegisterRequest } from '../interfaces/register.request';
import { generalException } from '@/modules/common/error/general.exception';

export const RegisterAction = async (
  registerRequest: RegisterRequest
): Promise<SchemaResponse<SignInResponse> | SchemaResponse<any>> => {
  try {
    const { data } = await cfdiOkApi.post<SchemaResponse<SignInResponse>>('/auth/register', registerRequest);

    return data
  } catch (error) {
    return generalException(error);
  }
};
