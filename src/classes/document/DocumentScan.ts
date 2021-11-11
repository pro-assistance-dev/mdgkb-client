import FileInfo from '@/classes/File/FileInfo';
import IDocumentScan from '@/interfaces/document/IDocumentScan';
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
    return this.scan;
  }
}
