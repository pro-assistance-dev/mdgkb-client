import IDocument from '@/interfaces/document/IDocument';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IUser from '@/interfaces/IUser';
import IVacancyResponseToDocument from '@/interfaces/vacancyResponse/IVacancyResponseToDocument';

export default interface IVacancyResponse {
  id?: string;
  vacancyId?: string;
  responseDate: Date;
  coverLetter: string;
  viewed: boolean;
  opened: boolean;
  user?: IUser;
  userId?: string;
  vacancyResponsesToDocuments: IVacancyResponseToDocument[];

  initDocuments: (documentsTypes: IDocumentType[]) => void;
  getFileInfos: () => IFileInfo[];
  findDocument: (documentTypeId: string) => IDocument | undefined;
}
