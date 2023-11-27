import FileInfo from '@/classes/FileInfo';

export interface IBodilessParams {
  query?: string;
  headers?: Headers;
  isBlob?: boolean;
  downloadFileName?: string;
}

export interface IBodyfulParams<PayloadType> {
  payload?: PayloadType;
  query?: string;
  isBlob?: boolean;
  downloadFileName?: string;
  headers?: Headers;
  isFormData?: boolean;
  fileInfos?: FileInfo[];
}
