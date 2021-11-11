import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/IHuman';
import IVacancyResponseToDocument from '@/interfaces/vacancyResponse/IVacancyResponseToDocument';

export default interface IVacancyResponse {
  id?: string;
  vacancyId?: string;
  responseDate: Date;
  coverLetter: string;
  viewed: boolean;
  opened: boolean;
  human?: IHuman;
  vacancyResponsesToDocuments: IVacancyResponseToDocument[];

  initDocuments: (documentsTypes: IDocumentType[]) => void;
  getFileInfos: () => IFileInfo[];
}
