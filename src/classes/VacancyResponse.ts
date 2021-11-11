import Document from '@/classes/document/Document';
import DocumentScan from '@/classes/document/DocumentScan';
import FileInfo from '@/classes/File/FileInfo';
import Human from '@/classes/Human';
import VacancyResponseToDocument from '@/classes/VacancyResponseToDocument';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/IHuman';
import IVacancyResponse from '@/interfaces/vacancyResponse/IVacancyResponse';
import IVacancyResponseToDocument from '@/interfaces/vacancyResponse/IVacancyResponseToDocument';

export default class VacancyResponse implements IVacancyResponse {
  id?: string;
  vacancyId?: string;
  coverLetter = '';
  responseDate: Date = new Date();
  viewed = false;

  opened = false;
  human?: IHuman;
  vacancyResponsesToDocuments: IVacancyResponseToDocument[] = [];

  constructor(i?: IVacancyResponse) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.vacancyId = i.vacancyId;
    this.coverLetter = i.coverLetter;
    this.responseDate = i.responseDate;
    this.viewed = i.viewed;

    if (i.human) {
      this.human = new Human(i.human);
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
}
