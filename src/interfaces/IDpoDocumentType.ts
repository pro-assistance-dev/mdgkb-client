import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentType from '@/interfaces/IDocumentType';

export default interface IDpoDocumentType {
  id?: string;
  documentType: IDocumentType;
  documentTypeId?: string;

  getFileInfos: () => IFileInfo[];
}
