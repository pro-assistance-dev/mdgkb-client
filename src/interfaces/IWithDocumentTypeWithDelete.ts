import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IWithDocumentType {
  id?: string;
  documentType: IDocumentType;
  documentTypeId?: string;
  order: number;

  getFileInfos: () => IFileInfo[];
}
