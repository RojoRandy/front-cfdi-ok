import type { SignInResponse } from '../interfaces';
import { cfdiOkApi } from '@/api/cfdiOkApi';
import type { SchemaResponse } from '@/modules/common/interfaces/api-schema-response';
import { generalException } from '@/modules/common/error/general.exception';

export const PasswordRecoveryAction = async (email: string): Promise<SchemaResponse<any>> => {
  try {
    const { data } = await cfdiOkApi.patch<SchemaResponse<any>>('/auth/password-recovery', {email});

    return data
  } catch (error) {
    return generalException(error);
  }
};
