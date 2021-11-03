import { v4 as uuidv4 } from 'uuid';

import DocumentField from '@/classes/document/DocumentField';
import FileInfo from '@/classes/File/FileInfo';
import IDocument from '@/interfaces/document/IDocument';
import IDocumentField from '@/interfaces/document/IDocumentField';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class Document implements IDocument {
  id?: string;
  name = '';
  fileInfo: IFileInfo = new FileInfo();
  fileInfoId?: string;
  documentFields: IDocumentField[] = [];
  documentFieldsForDelete: string[] = [];

  constructor(i?: IDocument) {
    if (!i) {
      return;
    }
    this.id = i?.id;
    this.name = i?.name ?? '';
    if (i.fileInfo) {
      this.fileInfo = new FileInfo(i.fileInfo);
    }
    this.fileInfoId = i.fileInfoId;
    if (i.documentFields) {
      this.documentFields = i.documentFields.map((item: IDocumentField) => new DocumentField(item));
    }
  }

  addField(): void {
    console.log(this);
    this.documentFields.push(new DocumentField());
  }

  removeField(index: number): void {
    const idForDelete = this.documentFields[index].id;
    if (idForDelete) {
      this.documentFieldsForDelete.push(idForDelete);
    }
    this.documentFields.splice(index, 1);
  }

  addFile(file: IElementPlusFile): void {
    if (!this.fileInfo.id) {
      this.fileInfo.id = uuidv4();
    }
    this.fileInfo.originalName = file.name;
    this.fileInfo.file = file.raw;
  }
}
