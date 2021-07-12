import IFileInfo from '@/interfaces/files/IFileInfo';

export interface IBodilessParams {
  query?: string;
  headers?: Headers;
  isBlob?: boolean;
}

export interface IBodyfulParams {
  payload?: any;
  query?: string;
  headers?: Headers;
  isFormData?: boolean;
  fileInfos?: IFileInfo[];
}
