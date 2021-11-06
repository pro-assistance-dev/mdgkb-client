import IDocumentFieldValue from '@/interfaces/document/IDocumentFieldValue';
import IDocumentType from '@/interfaces/document/IDocumentType';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IDocument {
  id?: string;
  documentTypeId?: string;
  documentType?: IDocumentType;

  scans: IFileInfo[];
  scansForDelete: string[];

  documentFieldValues: IDocumentFieldValue[];
  getFileInfos: () => IFileInfo[];
}
