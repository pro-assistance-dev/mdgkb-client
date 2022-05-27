import IDocumentFieldValue from '@/interfaces/document/IDocumentFieldValue';
import IDocumentScan from '@/interfaces/document/IDocumentScan';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';

import IFile from '../files/IFile';

export default interface IDocument {
  id?: string;
  name: string;
  documentTypeId?: string;
  documentType?: IDocumentType;

  order: number;
  documentsScans: IDocumentScan[];
  documentsScansForDelete: string[];

  documentFieldValues: IDocumentFieldValue[];
  getFileInfos: () => IFileInfo[];

  getScan: () => IFileInfo;
  uploadScan: (file: IFile) => IFileInfo;
  deleteScan: () => void;
}
