import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IDocument {
  id?: string;
  name: string;
  fileInfo: IFileInfo;
  fileInfoId?: string;

  addFile: (file: IElementPlusFile) => void;
}
