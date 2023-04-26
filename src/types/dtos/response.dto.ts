export interface ResponseAuthDTO<DATA> {
  request_id: string;
  request_date_time: string;
  response_code: string;
  response_message: string;
  response_description: string;
  access_token: string;
  refresh_token: string;
  data: DATA;
}
