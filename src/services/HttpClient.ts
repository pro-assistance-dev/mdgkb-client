// import moment from 'moment';

import { IBodilessParams, IBodyfulParams } from '@/interfaces/fetchApi/IHTTPTypes';

export default class HttpClient {
  endpoint: string;
  headers: Record<string, string>;

  constructor(endpoint = '/') {
    this.endpoint = endpoint;
    this.headers = { 'Content-Type': 'application/json' };
  }

  async get(params?: IBodilessParams): Promise<any> {
    const query = params?.query;
    const headers = params?.headers;
    const isBlob = params?.isBlob;

    const res = await fetch(this.baseUrl(query), {
      method: 'GET',
      headers: headers ?? this.headers,
    });

    return !isBlob ? res.json() : { href: URL.createObjectURL(await res.blob()), download: String(res.headers.get('Download-File-Name')) };
  }

  async post(params: IBodyfulParams): Promise<any> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    // this.toUtc(payload);
    let body: string | FormData = JSON.stringify(payload);

    if (isFormData) {
      body = new FormData();
      body.append('form', JSON.stringify(payload));

      if (fileInfos) {
        for (const fileInfo of fileInfos) {
          if (fileInfo.file) {
            body.append('files', fileInfo.file, fileInfo.originalName);
          }
        }
      }
    }

    const res = await fetch(this.baseUrl(query), {
      method: 'POST',
      headers: headers ?? isFormData ? {} : this.headers,
      body,
    });

    return res.json();
  }

  async put(params: IBodyfulParams): Promise<any> {
    const { payload, fileInfos, query, headers, isFormData } = params;

    // this.toUtc(payload);
    let body: string | FormData = JSON.stringify(payload);

    if (isFormData) {
      body = new FormData();
      body.append('form', JSON.stringify(payload));

      if (fileInfos) {
        for (const fileInfo of fileInfos) {
          if (fileInfo.file) {
            body.append('files', fileInfo.file, fileInfo.originalName);
          }
        }
      }
    }

    const res = await fetch(this.baseUrl(query), {
      method: 'PUT',
      headers: headers ?? isFormData ? {} : this.headers,
      body,
    });

    return res.json();
  }

  async delete(query?: string): Promise<any> {
    const res = await fetch(this.baseUrl(query), {
      method: 'DELETE',
      headers: this.headers,
    });
    return res.json();
  }

  private baseUrl(query?: string): string {
    if (!query) {
      return process.env.VUE_APP_BASE_URL + this.endpoint;
    }

    return `${process.env.VUE_APP_BASE_URL + this.endpoint}/${query}`;
  }

  // private toUtc(payload: Record<string, any>): Record<string, any> {
  //   const obj = payload;
  //   if (!obj) {
  //     return obj;
  //   }
  //
  //   for (const item of Object.keys(obj)) {
  //     if (obj[item] && typeof obj[item].getMonth !== 'function' && typeof obj[item] === 'object') {
  //       this.toUtc(obj[item]);
  //     }
  //
  //     if (obj[item] && typeof obj[item].getMonth === 'function') {
  //       obj[item] = moment(obj[item]).add(+moment().utcOffset(), 'm');
  //       obj[item] = obj[item]
  //         .parseZone()
  //         .utc()
  //         .format();
  //     }
  //   }
  //
  //   return obj;
  // }
}
