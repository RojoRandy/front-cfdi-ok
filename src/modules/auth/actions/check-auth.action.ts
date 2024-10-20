import type { SignInResponse } from '../interfaces';
import { isAxiosError } from 'axios';
import type { SchemaResponse } from '@/modules/common/interfaces/api-schema-response';
import { cfdiOkApi } from '@/api/cfdiOkApi';

export const checkAuthAction = async (): Promise<SchemaResponse<SignInResponse> | SchemaResponse<any>> => {
  try {
    const localToken = localStorage.getItem('token');
    if (localToken && localToken.length < 10) {
      return { 
        success: false,
        message: 'No se pudo verificar la sesión',
        data: undefined
      };
    }

    const { data } = await cfdiOkApi.get<SchemaResponse<SignInResponse>>('/auth/check-status');

    return data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return { 
        success: false,
        message: 'No se pudo verificar la sesión',
        data: undefined
      };
    }

    throw new Error('No se pudo verificar la sesión');
  }
};
