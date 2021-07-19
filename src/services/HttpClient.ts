import axios from 'axios';
import IFileInfo from '@/interfaces/files/IFileInfo';
import { IBodilessParams, IBodyfulParams } from '@/interfaces/fetchApi/IHTTPTypes';

export default class HttpClient {
  endpoint: string;
  headers: Record<string, string>;

  constructor(endpoint = '/') {
    this.endpoint = endpoint;
    this.headers = { 'Content-Type': 'application/json' };
  }

  // TODO: Подумать как избавиться от Promise<any> в возвращаемом значении.
  async get(params?: IBodilessParams): Promise<any> {
    const isBlob = params?.isBlob;

    const { data, headers } = await axios({
      url: this.buildUrl(params?.query),
      method: 'get',
      headers: params?.headers ?? this.headers,
      responseType: !isBlob ? 'json' : 'blob',
    });

    return !isBlob ? data : { href: URL.createObjectURL(data), download: String(headers.get('Download-File-Name')) };
  }

  async post<PayloadType>(params: IBodyfulParams<PayloadType>): Promise<any> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    const { data } = await axios({
      url: this.buildUrl(query),
      method: 'post',
      headers: headers ?? this.headers,
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  async put<PayloadType>(params: IBodyfulParams<PayloadType>): Promise<any> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    const { data } = await axios({
      url: this.buildUrl(query),
      method: 'put',
      headers: headers ?? this.headers,
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  async delete<PayloadType>(params: IBodyfulParams<PayloadType>): Promise<any> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    const { data } = await axios({
      url: this.buildUrl(query),
      method: 'delete',
      headers: headers ?? this.headers,
      data: !isFormData ? payload : this.createFormDataPayload<PayloadType>(payload, fileInfos),
    });

    return data;
  }

  private buildUrl(query?: string): string {
    return `${process.env.VUE_APP_BASE_URL + this.endpoint}/${query ?? ''}`;
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
