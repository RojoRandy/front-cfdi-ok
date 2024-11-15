import type { SignInResponse } from '../interfaces';
import { cfdiOkApi } from '@/api/cfdiOkApi';
import type { SchemaResponse } from '@/modules/common/interfaces/api-schema-response';
import { generalException } from '@/modules/common/error/general.exception';

export const VerifyPasswordRecoveryTokenAction = async (email:string, token: string): Promise<SchemaResponse<any>> => {
  try {
    const { data } = await cfdiOkApi.patch<SchemaResponse<any>>('/auth/verify-token', {email, token});

    return data
  } catch (error) {
    return generalException(error);
  }
};
