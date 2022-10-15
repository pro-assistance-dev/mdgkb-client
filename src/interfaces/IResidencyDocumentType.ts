import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentType from '@/interfaces/IDocumentType';

export default interface IResidencyDocumentType {
  id?: string;
  documentType: IDocumentType;
  documentTypeId?: string;

  getFileInfos: () => IFileInfo[];
}
