import { v4 as uuidv4 } from 'uuid';

import DocumentTypeField from '@/classes/document/DocumentTypeField';
import FileInfo from '@/classes/File/FileInfo';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IDocumentTypeField from '@/interfaces/document/IDocumentTypeField';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class DocumentType implements IDocumentType {
  id?: string;
  name = '';
  singleScan = false;
  scan?: IFileInfo;
  scanId?: string;

  scans: IFileInfo[] = [];
  scansForDelete: string[] = [];

  documentFields: IDocumentTypeField[] = [];
  documentFieldsForDelete: string[] = [];

  constructor(i?: IDocumentType) {
    if (!i) {
      return;
    }
    this.id = i?.id;
    this.name = i?.name ?? '';
    this.singleScan = i.singleScan;

    if (i.scan) {
      this.scan = new FileInfo(i.scan);
    }
    this.scanId = i.scanId;
    if (i.documentFields) {
      this.documentFields = i.documentFields.map((item: IDocumentTypeField) => new DocumentTypeField(item));
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

  // findDocument();
}
