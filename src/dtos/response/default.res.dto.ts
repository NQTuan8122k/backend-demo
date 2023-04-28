export interface DefaultResponse<T> {
  request_id: string | null;
  request_date_time: string | null;
  response_code: string | null;
  response_message: string | null;
  response_description: string | null;
  access_token: string | null;
  refresh_token: string | null;
  data: T;
}

export interface AuthResponse<T> {
  request_id: string | null;
  request_date_time: string | null;
  response_code: string | null;
  response_message: string | null;
  response_description: string | null;
  data: T;
}
