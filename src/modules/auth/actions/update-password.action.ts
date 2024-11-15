import type { SignInResponse } from '../interfaces';
import { cfdiOkApi } from '@/api/cfdiOkApi';
import type { SchemaResponse } from '@/modules/common/interfaces/api-schema-response';
import { generalException } from '@/modules/common/error/general.exception';
import type { UpdatePasswordRequest } from '../interfaces/update-password.interface';

export const UpdatePasswordAction = async (request: UpdatePasswordRequest): Promise<SchemaResponse<any>> => {
  try {
    const { data } = await cfdiOkApi.patch<SchemaResponse<any>>('/auth/update-password', request);

    return data;
  } catch (error) {
    return generalException(error);
  }
};
