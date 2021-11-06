import IDocumentTypeField from '@/interfaces/document/IDocumentTypeField';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IDocumentType {
  id?: string;
  name: string;
  singleScan: boolean;

  scan?: IFileInfo;
  scanId?: string;

  scans: IFileInfo[];
  scansForDelete: string[];

  addFile: (file: IElementPlusFile) => void;
  addField: () => void;
  removeField: (index: number) => void;

  documentFields: IDocumentTypeField[];
  documentFieldsForDelete: string[];
}
