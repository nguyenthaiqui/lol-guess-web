export interface IAPIResponse<T> {
  data: T;
  statusCode: number;
  message: string;
  error?: string;
}
