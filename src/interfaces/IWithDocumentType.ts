import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IWithDocumentType {
  id?: string;
  documentType: PageSection;
  documentTypeId?: string;
  order: number;

  getFileInfos: () => IFileInfo[];
}
