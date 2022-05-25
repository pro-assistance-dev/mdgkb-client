import IDocument from '@/interfaces/document/IDocument';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IUser from '@/interfaces/IUser';
import IVacancyResponseToDocument from '@/interfaces/vacancyResponse/IVacancyResponseToDocument';

import IForm from '../IForm';

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
  formValue: IForm;
  formValueId?: string;

  initDocuments: (documentsTypes: IDocumentType[]) => void;
  getFileInfos: () => IFileInfo[];
  findDocument: (documentTypeId: string) => IDocument | undefined;
}
