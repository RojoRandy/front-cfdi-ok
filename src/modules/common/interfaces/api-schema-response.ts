export interface SchemaResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
