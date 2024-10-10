import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from '../interfaces';

export const RegisterAction = async (
  fullName: string,
  email: string,
  password: string,
) => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    throw new Error('No se pudo realizar la petición');
  }
};
