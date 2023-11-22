import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IWithImage {
  id?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo;
  description?: string;
  order: number;
}
