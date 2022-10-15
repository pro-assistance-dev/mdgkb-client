import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentType from '@/interfaces/IDocumentType';

export default interface IAdmissionCommitteeDocumentType {
  id?: string;
  documentType: IDocumentType;
  documentTypeId?: string;
  order: number;
  getFileInfos: () => IFileInfo[];
}
