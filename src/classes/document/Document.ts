import DocumentFieldValue from '@/classes/document/DocumentFieldValue';
import DocumentScan from '@/classes/document/DocumentScan';
import DocumentType from '@/classes/document/DocumentType';
import IDocument from '@/interfaces/document/IDocument';
import IDocumentFieldValue from '@/interfaces/document/IDocumentFieldValue';
import IDocumentScan from '@/interfaces/document/IDocumentScan';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class Document implements IDocument {
  id?: string;
  name = '';

  documentTypeId?: string;
  documentType: IDocumentType = new DocumentType();

  documentsScans: IDocumentScan[] = [];
  documentsScansForDelete: string[] = [];

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
    if (i.documentsScans) {
      this.documentsScans = i.documentsScans.map((item: IDocumentScan) => new DocumentScan(item));
    }
    if (i.documentFieldValues) {
      this.documentFieldValues = i.documentFieldValues.map((item: IDocumentFieldValue) => new DocumentFieldValue(item));
    }
  }

  getFileInfos(): IFileInfo[] {
    return this.documentsScans.map((i: IDocumentScan) => i.getFileInfo());
  }

  getScan(): IFileInfo {
    return this.documentsScans[0].scan;
  }
}
