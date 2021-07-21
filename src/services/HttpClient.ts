import axios from 'axios';
import IFileInfo from '@/interfaces/files/IFileInfo';
import { IBodilessParams, IBodyfulParams } from '@/interfaces/fetchApi/IHTTPTypes';

export default class HttpClient {
  endpoint: string;
  headers: Record<string, string>;

  constructor(endpoint = '') {
    this.endpoint = endpoint;
    this.headers = { 'Content-Type': 'application/json' };
  }

  async get<ReturnType>(params?: IBodilessParams): Promise<ReturnType> {
    const isBlob = params?.isBlob;
    const headers = params?.headers;

    const { data, headers: resHeaders } = await axios({
      url: this.buildUrl(params?.query),
      method: 'get',
      headers: { ...(headers ?? this.headers), token: localStorage.getItem('token') },
      responseType: !isBlob ? 'json' : 'blob',
    });

    return !isBlob ? data : { href: URL.createObjectURL(data), download: String(resHeaders.get('Download-File-Name')) };
  }

  async post<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    const { data } = await axios({
      url: this.buildUrl(query),
      method: 'post',
      headers: { ...(headers ?? this.headers), token: localStorage.getItem('token') },
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  async put<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    const { data } = await axios({
      url: this.buildUrl(query),
      method: 'put',
      headers: { ...(headers ?? this.headers), token: localStorage.getItem('token') },
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  async delete<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    const { data } = await axios({
      url: this.buildUrl(query),
      method: 'delete',
      headers: { ...(headers ?? this.headers), token: localStorage.getItem('token') },
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  private buildUrl(query?: string): string {
    return this.endpoint.length <= 0
      ? `${process.env.VUE_APP_BASE_URL + (query ?? '')}`
      : `${process.env.VUE_APP_BASE_URL + this.endpoint}/${query ?? ''}`;
  }

  private createFormDataPayload<PayloadType>(payload?: PayloadType, fileInfos?: IFileInfo[]): FormData {
    const data = new FormData();
    data.append('form', JSON.stringify(payload));

    if (fileInfos) {
      for (const fileInfo of fileInfos) {
        if (fileInfo.file) {
          data.append('files', fileInfo.file, fileInfo.originalName);
        }
      }
    }

    return data;
  }
}
