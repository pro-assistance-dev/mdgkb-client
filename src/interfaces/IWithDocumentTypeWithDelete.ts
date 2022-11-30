import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSection from '@/interfaces/IPageSection';

export default interface IWithDocumentType {
  id?: string;
  documentType: IPageSection;
  documentTypeId?: string;
  order: number;

  getFileInfos: () => IFileInfo[];
}
