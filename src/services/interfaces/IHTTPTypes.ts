import FileInfo from '@/services/classes/FileInfo.ts';
import HttpHeaders from '../types/HttpHeaders';

export interface IBodilessParams {
  query?: string;
  headers?: HttpHeaders;
  isBlob?: boolean;
  downloadFileName?: string;
}

export interface IBodyfulParams<PayloadType> {
  payload?: PayloadType;
  query?: string;
  isBlob?: boolean;
  downloadFileName?: string;
  headers?: HttpHeaders;
  fileInfos?: FileInfo[];
}
