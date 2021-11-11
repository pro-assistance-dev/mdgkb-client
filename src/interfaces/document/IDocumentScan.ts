import IDocument from '@/interfaces/document/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IDocumentScan {
  id?: string;
  document?: IDocument;
  documentId?: string;

  scan: IFileInfo;
  scanId?: string;

  getFileInfo: () => IFileInfo;
}
