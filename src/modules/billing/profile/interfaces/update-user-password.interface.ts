export interface UpdateUserPasswordRequest {
  currentPassword: string;
  password:        string;
  passwordConfirm: string;
}
