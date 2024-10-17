export interface ErrorResponse {
  code: string;
  description: string;
  timestamp: Date;
  data: any;
  path: string;
}
