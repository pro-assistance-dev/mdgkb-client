import { IBodilessParams, IBodyfulParams } from '@/interfaces/fetchApi/IHTTPTypes';
import IFileInfo from '@/interfaces/files/IFileInfo';
import axiosInstance from '@/services/Axios';
import TokenService from '@/services/Token';

const baseUrl = process.env.VUE_APP_BASE_URL ?? '';
const apiVersion = process.env.VUE_APP_API_V1 ?? '';
const apiHost = process.env.VUE_APP_API_HOST ?? '';
export default class HttpClient {
  endpoint: string;
  headers: Record<string, string>;

  constructor(endpoint = '') {
    this.endpoint = endpoint;
    this.headers = { 'Content-Type': 'application/json' };
  }

  newWebSocket(query: string): WebSocket {
    const url = apiHost.replace('http', 'ws') + 'ws' + '/' + this.endpoint + '/' + query;
    return new WebSocket(url);
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
    const res = await axiosInstance({
      url: this.buildUrl(params?.query),
      method: 'get',
      headers: { ...(headers ?? this.headers), token: TokenService.getAccessToken() },
      responseType: !isBlob ? 'json' : 'blob',
    });
    if (!res) {
      return;
    }
    if (!isBlob) {
      return res.data;
    }

    const headerLine = res.headers['content-disposition'];
    const startFileNameIndex = headerLine.indexOf('"') + 1;
    const endFileNameIndex = headerLine.lastIndexOf('"');
    const filename = headerLine.substring(startFileNameIndex, endFileNameIndex);
    const url = URL.createObjectURL(res.data);
    const fileName = HttpClient.getDownloadFileName(params?.downloadFileName, filename);

    return HttpClient.download(url, fileName);
  }

  async post<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType | void> {
    const { payload, fileInfos, query, headers, isFormData, isBlob, downloadFileName } = params;
    const { data } = await axiosInstance({
      url: this.buildUrl(query),
      method: 'post',
      headers: { ...(headers ?? this.headers), token: TokenService.getAccessToken() },
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
      responseType: isBlob ? 'blob' : undefined,
    });
    if (!isBlob) {
      return data;
    }
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const fileName = HttpClient.getDownloadFileName(downloadFileName, '');
    return HttpClient.download(url, fileName);
  }

  async put<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    const { data } = await axiosInstance({
      url: this.buildUrl(query),
      method: 'put',
      headers: { ...(headers ?? this.headers), token: TokenService.getAccessToken() },
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  async delete<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    const { data } = await axiosInstance({
      url: this.buildUrl(query),
      method: 'delete',
      headers: { ...(headers ?? this.headers), token: TokenService.getAccessToken() },
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  async subscribe<PayloadType>(params: IBodyfulParams<PayloadType>): Promise<EventSource> {
    const { query } = params;

    const source = new EventSource(this.buildUrl(query));
    return source;
  }

  private buildUrl(query?: string): string {
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
