export enum HttpHeadersKeys {
  ContentType = 'Content-Type',
  Token = 'token',
}
export enum HttpHeadersValues {
  ApplicationJson = 'application/json',
  MultipartFormData = 'multipart/form-data',
}

type HttpHeaders = Partial<Record<HttpHeadersKeys, HttpHeadersValues | string>>;

export default HttpHeaders;
