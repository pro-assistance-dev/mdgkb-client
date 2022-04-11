import IDocumentTypeField from '@/interfaces/document/IDocumentTypeField';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

import IDocument from './IDocument';

export default interface IDocumentType {
  id?: string;
  name: string;
  singleScan: boolean;
  description: string;
  scan?: IFileInfo;
  scanId?: string;

  scans: IFileInfo[];
  scansForDelete: string[];

  documents: IDocument[];
  documentsForDelete: string[];

  addFile: (file: IElementPlusFile) => void;
  addField: () => void;
  removeField: (index: number) => void;
  addDocument: () => void;
  removeDocument: (index: number) => void;

  documentFields: IDocumentTypeField[];
  documentFieldsForDelete: string[];
  getFileInfos: () => IFileInfo[];
  // findDocument: (documents: IDocument[]) => IDocument;
}
