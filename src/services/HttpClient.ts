import axios from 'axios';

import { IBodilessParams, IBodyfulParams } from '@/interfaces/fetchApi/IHTTPTypes';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class HttpClient {
  endpoint: string;
  headers: Record<string, string>;

  constructor(endpoint = '') {
    this.endpoint = endpoint;
    this.headers = { 'Content-Type': 'application/json' };
  }

  private static download(url: string, name: string) {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name ?? 'file.pdf');
    document.body.appendChild(link);
    link.click();
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
    return !isBlob ? data : HttpClient.download(URL.createObjectURL(data), resHeaders['download-file-name']);
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
    const baseUrl = process.env.VUE_APP_BASE_URL ?? '';
    const apiVersion = process.env.VUE_APP_API_V1 ?? '';

    if (query) {
      const queryString = query ?? '';

      return this.endpoint.length <= 0 ? baseUrl + apiVersion + queryString : baseUrl + apiVersion + this.endpoint + '/' + queryString;
    }

    return baseUrl + apiVersion + this.endpoint;
  }

  private createFormDataPayload<PayloadType>(payload?: PayloadType, fileInfos?: IFileInfo[]): FormData {
    const data = new FormData();
    data.append('form', JSON.stringify(payload));

    if (fileInfos) {
      for (const fileInfo of fileInfos) {
        if (fileInfo.file) {
          data.append(fileInfo.id ?? 'files', fileInfo.file, fileInfo.originalName);
        }
      }
    }

    return data;
  }
}
