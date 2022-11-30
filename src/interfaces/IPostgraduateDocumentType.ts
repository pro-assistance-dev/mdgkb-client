import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSection from '@/interfaces/IPageSection';

export default interface IPostgraduateDocumentType {
  id?: string;
  documentType: IPageSection;
  documentTypeId?: string;

  getFileInfos: () => IFileInfo[];
}
