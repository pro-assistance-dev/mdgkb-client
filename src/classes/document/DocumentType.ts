import { v4 as uuidv4 } from 'uuid';

import Document from '@/classes/document/Document';
import DocumentTypeField from '@/classes/document/DocumentTypeField';
import DocumentTypeImage from '@/classes/DocumentTypeImage';
import FileInfo from '@/classes/File/FileInfo';
import IDocument from '@/interfaces/document/IDocument';
import IDocumentTypeField from '@/interfaces/document/IDocumentTypeField';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentType from '@/interfaces/IDocumentType';
import IDocumentTypeImage from '@/interfaces/IDocumentTypeImage';

export default class DocumentType implements IDocumentType {
  id?: string;
  name = '';
  singleScan = false;
  scan?: IFileInfo;
  order = 0;
  scanId?: string;
  description = '';
  scans: IFileInfo[] = [];
  scansForDelete: string[] = [];

  documents: IDocument[] = [];
  documentsForDelete: string[] = [];

  documentFields: IDocumentTypeField[] = [];
  documentFieldsForDelete: string[] = [];

  documentTypeImages: IDocumentTypeImage[] = [];
  documentTypeImagesForDelete: string[] = [];

  constructor(i?: IDocumentType) {
    if (!i) {
      return;
    }
    this.id = i?.id;
    this.name = i?.name ?? '';
    this.singleScan = i.singleScan;
    this.order = i.order;
    this.description = i.description;
    if (i.scan) {
      this.scan = new FileInfo(i.scan);
    }
    this.scanId = i.scanId;
    if (i.documentFields) {
      this.documentFields = i.documentFields.map((item: IDocumentTypeField) => new DocumentTypeField(item));
    }
    if (i.documents) {
      this.documents = i.documents.map((item: IDocument) => new Document(item));
    }
    if (i.documentTypeImages) {
      this.documentTypeImages = i.documentTypeImages.map((item: IDocumentTypeImage) => new DocumentTypeImage(item));
    }

    if (i.scans) {
      this.scans = i.scans.map((item: IFileInfo) => new FileInfo(item));
    }
  }

  addField(): void {
    this.documentFields.push(new DocumentTypeField());
  }

  removeField(index: number): void {
    const idForDelete = this.documentFields[index].id;
    if (idForDelete) {
      this.documentFieldsForDelete.push(idForDelete);
    }
    this.documentFields.splice(index, 1);
  }

  addFile(file: IElementPlusFile): void {
    if (!this.scan) {
      this.scan = new FileInfo();
    }
    if (!this.scan.id) {
      this.scan.id = uuidv4();
    }
    this.scan.originalName = file.name;
    this.scan.file = file.raw;
  }
  addDocument(): void {
    this.documents.push(new Document());
  }
  removeDocument(index: number): void {
    const idForDelete = this.documents[index].id;
    if (idForDelete) {
      this.documentsForDelete.push(idForDelete);
    }
    this.documents.splice(index, 1);
  }
  // findDocument();

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.documents.forEach((i: IDocument) => {
      fileInfos.push(...i.getFileInfos());
    });
    this.documentTypeImages.forEach((i: IDocumentTypeImage) => {
      fileInfos.push(i.fileInfo);
    });
    return fileInfos;
  }
  addDocumentTypeImage(): void {
    this.documentTypeImages.push(new DocumentTypeImage());
  }
}
