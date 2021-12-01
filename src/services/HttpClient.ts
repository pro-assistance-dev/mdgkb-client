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
    link.setAttribute('download', name);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
  }

  private static getDownloadFileName(clientFileName: string | undefined, serverFileName: string | undefined): string {
    if (clientFileName) {
      return clientFileName;
    }
    if (serverFileName) {
      return serverFileName;
    }
    return 'file';
  }

  async get<ReturnType>(params?: IBodilessParams): Promise<ReturnType | void> {
    const isBlob = params?.isBlob;
    const headers = params?.headers;

    const { data, headers: resHeaders } = await axios({
      url: this.buildUrl(params?.query),
      method: 'get',
      headers: { ...(headers ?? this.headers), token: localStorage.getItem('token') },
      responseType: !isBlob ? 'json' : 'blob',
    });
    if (!isBlob) {
      return data;
    }

    const headerLine = resHeaders['content-disposition'];
    const startFileNameIndex = headerLine.indexOf('"') + 1;
    const endFileNameIndex = headerLine.lastIndexOf('"');
    const filename = headerLine.substring(startFileNameIndex, endFileNameIndex);

    const url = URL.createObjectURL(data);
    const fileName = HttpClient.getDownloadFileName(params?.downloadFileName, filename);

    return HttpClient.download(url, fileName);
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
