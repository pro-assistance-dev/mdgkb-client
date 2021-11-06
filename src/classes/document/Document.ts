import DocumentFieldValue from '@/classes/document/DocumentFieldValue';
import DocumentType from '@/classes/document/DocumentType';
import FileInfo from '@/classes/File/FileInfo';
import IDocument from '@/interfaces/document/IDocument';
import IDocumentFieldValue from '@/interfaces/document/IDocumentFieldValue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class Document implements IDocument {
  id?: string;
  name = '';

  documentTypeId?: string;
  documentType: IDocumentType = new DocumentType();

  scans: IFileInfo[] = [];
  scansForDelete: string[] = [];

  documentFieldValues: IDocumentFieldValue[] = [];

  constructor(i?: IDocument) {
    if (!i) {
      return;
    }
    this.id = i?.id;
    this.documentTypeId = i.documentTypeId;
    if (i.documentType) {
      this.documentType = new DocumentType(i.documentType);
    }
    if (i.scans) {
      this.scans = i.scans.map((item: IFileInfo) => new FileInfo(item));
    }
    if (i.documentFieldValues) {
      this.documentFieldValues = i.documentFieldValues.map((item: IDocumentFieldValue) => new DocumentFieldValue(item));
    }
  }

  getFileInfos(): IFileInfo[] {
    return this.scans;
  }
}
