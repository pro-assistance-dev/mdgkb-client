import HttpEngine from '@/services/Axios';
import FileInfo from '@/services/classes/FileInfo';
import { IBodilessParams, IBodyfulParams } from '@/services/interfaces/IHTTPTypes';

import LocalStore from './classes/LocalStore';
import LocalStoreKeys from './interfaces/LocalStoreKeys';
import HttpHeaders, { HttpHeadersKeys, HttpHeadersValues } from './types/HttpHeaders';

const baseUrl = import.meta.env.VITE_APP_BASE_URL ?? '';
const apiVersion = import.meta.env.VITE_APP_API_V1 ?? '';
const apiHost = import.meta.env.VITE_APP_API_HOST ?? '';

export default abstract class HttpClient {
  static headers: HttpHeaders = { [HttpHeadersKeys.ContentType]: HttpHeadersValues.ApplicationJson };

  newWebSocket(query: string): WebSocket {
    const url = apiHost.replace('http', 'ws') + '/ws' + '/' + query;
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

  private static getHeaders(headers?: HttpHeaders): HttpHeaders {
    const token = LocalStore.Get<string>(LocalStoreKeys.AccessToken);
    if (!headers) {
      headers = HttpClient.headers;
    }
    if (token) {
      headers[HttpHeadersKeys.Token] = token;
    }
    return headers ?? HttpClient.headers;
  }

  private static returnResponse<ReturnType, PayloadType>(
    params: IBodilessParams | IBodyfulParams<PayloadType> | undefined,
    res: any
  ): ReturnType | void {
    if (!res) {
      return;
    }
    return params?.isBlob ? HttpClient.download(params.downloadFileName, res) : res.data;
  }

  static async Get<ReturnType>(params?: IBodilessParams): Promise<ReturnType | void> {
    return HttpClient.returnResponse(
      params,
      await HttpEngine.Get(
        HttpClient.buildUrl(params?.query ?? ''),
        HttpClient.getHeaders(params?.headers),
        HttpClient.getResponseType(params?.isBlob)
      )
    );
  }

  static async Post<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType | void> {
    return HttpClient.returnResponse(
      params,
      await HttpEngine.Post(
        HttpClient.buildUrl(params?.query),
        HttpClient.getHeaders(params?.headers),
        HttpClient.getResponseType(params.isBlob),
        HttpClient.createFormDataPayload<PayloadType>(params?.payload, params?.fileInfos)
      )
    );
  }

  static async Put<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType | void> {
    return HttpClient.returnResponse(
      params,
      await HttpEngine.Put(
        HttpClient.buildUrl(params?.query),
        HttpClient.getHeaders(params?.headers),
        HttpClient.createFormDataPayload<PayloadType>(params?.payload, params?.fileInfos)
      )
    );
  }

  static async Delete<PayloadType, ReturnType>(params: IBodyfulParams<PayloadType>): Promise<ReturnType | void> {
    return HttpClient.returnResponse(
      params,
      await HttpEngine.Delete(
        HttpClient.buildUrl(params?.query),
        HttpClient.getHeaders(params?.headers),
        HttpClient.createFormDataPayload<PayloadType>(params?.payload, params?.fileInfos)
      )
    );
  }

  static async Subscribe<PayloadType>(params: IBodyfulParams<PayloadType>): Promise<EventSource> {
    const { query } = params;

    const source = new EventSource(HttpClient.buildUrl(query));
    return source;
  }

  private static buildUrl(query: string): string {
    const queryString = query ?? '';
    return baseUrl + apiVersion + queryString;
    // const queryString = query ? '/' + query : '';
    // return baseUrl + '/' + apiVersion + '/' + queryString;
  }

  private static getResponseType(blob?: boolean): 'blob' | 'json' {
    return blob ? 'blob' : 'json';
  }

  private static createFormDataPayload<PayloadType>(payload?: PayloadType, fileInfos?: FileInfo[]): FormData {
    const data = new FormData();
    data.append('form', JSON.stringify(payload));
    // console.log(data, payload);

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
