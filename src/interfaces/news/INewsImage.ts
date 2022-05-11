import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface INewsImage {
  id?: string;
  newsId?: string;
  fileInfoId?: string;
  order: number;
  fileInfo: IFileInfo;
  description?: string;
}
