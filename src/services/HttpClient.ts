import HttpEngine from '@/services/Axios';
import FileInfo from '@/services/classes/FileInfo';
import { IBodilessParams, IBodyfulParams } from '@/services/interfaces/IHTTPTypes';

import LocalStore from './classes/LocalStore';
import LocalStoreKeys from './interfaces/LocalStoreKeys';
import HttpHeaders, { HttpHeadersKeys,HttpHeadersValues } from './types/HttpHeaders';

const baseUrl = import.meta.env.VITE_APP_BASE_URL ?? '';
const apiVersion = import.meta.env.VITE_APP_API_V1 ?? '';
const apiHost = import.meta.env.VITE_APP_API_HOST ?? '';

export default class HttpClient {
  endpoint: string;
  headers: HttpHeaders;

  constructor(endpoint = '') {
    this.endpoint = endpoint;
    this.headers = { [HttpHeadersKeys.ContentType]: HttpHeadersValues.ApplicationJson };
  }

  newWebSocket(query: string): WebSocket {
    const url = apiHost.replace('http', 'ws') + '/ws' + '/' + this.endpoint + '/' + query;
    return new WebSocket(url);
  }

  private static download(clientFileName: string | undefined, res: any) {
    const fileName = HttpClient.getDownloadFileName(clientFileName, res.headers);
    const url = URL.createObjectURL(res.data);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
  }

  private static getDownloadFileName(clientFileName: string | undefined, headers: any): string {
    if (clientFileName) {
      return clientFileName;
    }
    const headerLine = headers['content-disposition'];
    const startFileNameIndex = headerLine.indexOf('"') + 1;
    const endFileNameIndex = headerLine.lastIndexOf('"');
    const serverFileName = headerLine.substring(startFileNameIndex, endFileNameIndex);

    if (serverFileName) {
      return serverFileName;
    }
    return 'file';
  }

  private getHeaders(headers?: HttpHeaders): HttpHeaders {
    const token = LocalStore.Get<string>(LocalStoreKeys.AccessToken);
    if (!headers) {
      headers = this.headers;
    }
    if (token) {
      headers[HttpHeadersKeys.Token] = token;
    }
    return headers ?? this.headers;
  }

  private returnResponse<ReturnType, PayloadType>(
    params: IBodilessParams | IBodyfulParams<PayloadType> | undefined,
    res: any
  ): ReturnType | void {
    if (!res) {
      return;
    }
    return params?.isBlob ? HttpClient.download(params.downloadFileName, res) : res.data;
  }

  async get<ReturnType>(params?: IBodilessParams): Promise<ReturnType | void> {
    return this.returnResponse(
      params,
      await HttpEngine.Get(this.buildUrl(params?.query), this.getHeaders(params?.headers), this.getResponseType(params?.isBlob))
    );
  }

  async post<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType | void> {
    return this.returnResponse(
      params,
      await HttpEngine.Post(
        this.buildUrl(params?.query),
        this.getHeaders(params?.headers),
        this.getResponseType(params.isBlob),
        this.createFormDataPayload<PayloadType>(params?.payload, params?.fileInfos)
      )
    );
  }

  async put<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType | void> {
    return this.returnResponse(
      params,
      await HttpEngine.Put(
        this.buildUrl(params?.query),
        this.getHeaders(params?.headers),
        this.createFormDataPayload<PayloadType>(params?.payload, params?.fileInfos)
      )
    );
  }

  async delete<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType | void> {
    return this.returnResponse(
      params,
      await HttpEngine.Delete(
        this.buildUrl(params?.query),
        this.getHeaders(params?.headers),
        this.createFormDataPayload<PayloadType>(params?.payload, params?.fileInfos)
      )
    );
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

  private getResponseType(blob?: boolean): 'blob' | 'json' {
    return blob ? 'blob' : 'json';
  }

  private createFormDataPayload<PayloadType>(payload?: PayloadType, fileInfos?: FileInfo[]): FormData {
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
