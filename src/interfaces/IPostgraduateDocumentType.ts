import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IPostgraduateDocumentType {
  id?: string;
  documentType: IDocumentType;
  documentTypeId?: string;

  getFileInfos: () => IFileInfo[];
}
