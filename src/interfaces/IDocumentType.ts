import IDocumentTypeField from '@/interfaces/document/IDocumentTypeField';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentTypeImage from '@/interfaces/IDocumentTypeImage';

import IDocument from './document/IDocument';

export default interface IDocumentType {
  id?: string;
  name: string;
  singleScan: boolean;
  description: string;
  scan?: IFileInfo;
  scanId?: string;
  order: number;
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
  documentTypeImages: IDocumentTypeImage[];
  documentTypeImagesForDelete: string[];
  addDocumentTypeImage: () => void;
  getFileInfos: () => IFileInfo[];
  // findDocument: (documents: IDocument[]) => IDocument;
}
