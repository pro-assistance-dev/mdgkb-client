import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/classes/File/FileInfo';
import IDocumentScan from '@/interfaces/document/IDocumentScan';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class DocumentScan implements IDocumentScan {
  id?: string;
  name = '';

  documentId?: string;

  scan: IFileInfo = new FileInfo();
  scanId?: string;

  constructor(i?: IDocumentScan) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.documentId = i.documentId;
    this.scan = new FileInfo(i.scan);
  }

  getFileInfo(): IFileInfo {
    this.scan.url = '';
    return this.scan;
  }

  static CreateNewScan(file: IFile): IDocumentScan {
    const documentScan = new DocumentScan();
    documentScan.scan.originalName = file.name;
    documentScan.scan.file = file.raw;
    documentScan.scan.fileSystemPath = uuidv4();
    documentScan.scan.id = documentScan.scan.id ?? uuidv4();
    documentScan.scan.url = file.url;
    return documentScan;
  }
}
