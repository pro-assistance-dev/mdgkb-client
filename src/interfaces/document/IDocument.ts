import IDocumentFieldValue from '@/interfaces/document/IDocumentFieldValue';
import IDocumentScan from '@/interfaces/document/IDocumentScan';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IDocument {
  id?: string;
  documentTypeId?: string;
  documentType?: IDocumentType;

  documentsScans: IDocumentScan[];
  documentsScansForDelete: string[];

  documentFieldValues: IDocumentFieldValue[];
  getFileInfos: () => IFileInfo[];

  getScan: () => IFileInfo;
}
