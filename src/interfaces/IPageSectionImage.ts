import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IPageSectionImage {
  id?: string;
  documentTypeId?: string;
  fileInfoId?: string;
  order: number;
  fileInfo: IFileInfo;
  description: string;
}
