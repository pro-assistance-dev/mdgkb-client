import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentType from '@/interfaces/IDocumentType';

export default interface IWithDocumentType {
  id?: string;
  documentType: IDocumentType;
  documentTypeId?: string;
  order: number;

  getFileInfos: () => IFileInfo[];
}
