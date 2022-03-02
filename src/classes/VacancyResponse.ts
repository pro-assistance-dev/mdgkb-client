import Document from '@/classes/document/Document';
import DocumentScan from '@/classes/document/DocumentScan';
import FileInfo from '@/classes/File/FileInfo';
import User from '@/classes/User';
import VacancyResponseToDocument from '@/classes/VacancyResponseToDocument';
import IDocument from '@/interfaces/document/IDocument';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IUser from '@/interfaces/IUser';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import IVacancyResponseToDocument from '@/interfaces/vacancyResponse/IVacancyResponseToDocument';
import TokenService from '@/services/Token';

export default class VacancyResponse implements IVacancyResponse {
  id?: string;
  vacancyId?: string;
  coverLetter = '';
  responseDate: Date = new Date();
  viewed = false;

  opened = false;
  user?: IUser;
  userId?: string;
  vacancyResponsesToDocuments: IVacancyResponseToDocument[] = [];

  constructor(i?: IVacancyResponse) {
    if (!i) {
      if (TokenService.isAuth()) {
        this.user = new User(TokenService.getUser());
        return;
      }
      this.user = new User();
      return;
    }
    this.id = i.id;
    this.vacancyId = i.vacancyId;
    this.coverLetter = i.coverLetter;
    this.responseDate = i.responseDate;
    this.viewed = i.viewed;

    this.userId = i.userId;
    if (i.user) {
      this.user = new User(i.user);
    }
    if (i.vacancyResponsesToDocuments) {
      this.vacancyResponsesToDocuments = i.vacancyResponsesToDocuments.map(
        (item: IVacancyResponseToDocument) => new VacancyResponseToDocument(item)
      );
    }
  }

  initDocuments(documentsTypes: IDocumentType[]): void {
    if (this.vacancyResponsesToDocuments.length) {
      return;
    }
    this.vacancyResponsesToDocuments = documentsTypes.map((documentsType: IDocumentType) => {
      const vacancyResponseToDocument = new VacancyResponseToDocument();

      const doc = new Document();
      doc.documentTypeId = documentsType.id;
      doc.documentsScans = [new DocumentScan()];
      doc.documentsScans[0].scan = new FileInfo();
      vacancyResponseToDocument.document = doc;

      return vacancyResponseToDocument;
    });
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.vacancyResponsesToDocuments.forEach((vacancyResponseToDocument: IVacancyResponseToDocument) => {
      fileInfos.push(...vacancyResponseToDocument.document.getFileInfos());
    });
    return fileInfos;
  }

  findDocument(documentTypeId: string): IDocument | undefined {
    const vacancyResponseToDocument = this.vacancyResponsesToDocuments.find(
      (vacancyResponseToDocument: IVacancyResponseToDocument) => documentTypeId === vacancyResponseToDocument.document.documentTypeId
    );
    if (vacancyResponseToDocument) {
      return vacancyResponseToDocument.document;
    }
  }
}
