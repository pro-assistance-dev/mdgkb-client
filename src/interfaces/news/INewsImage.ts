import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface INewsImage {
  id?: string;
  newsId?: string;
  fileInfoId?: string;
  fileInfo?: IFileInfo;
  description?: string;
}
