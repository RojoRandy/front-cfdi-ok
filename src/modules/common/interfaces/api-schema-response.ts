export interface ResponseDto {
  message: string;
  success: boolean;

}

export interface SchemaResponse<T> extends ResponseDto {
  data: T;
}
