import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IPageImage {
  id?: string;
  pageId?: string;
  fileInfoId?: string;
  fileInfo?: IFileInfo;
  description?: string;
}
