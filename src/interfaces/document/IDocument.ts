import IDocumentField from '@/interfaces/document/IDocumentField';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IDocument {
  id?: string;
  name: string;
  fileInfo: IFileInfo;
  fileInfoId?: string;

  addFile: (file: IElementPlusFile) => void;
  addField: () => void;
  removeField: (index: number) => void;

  documentFields: IDocumentField[];
  documentFieldsForDelete: string[];
}
