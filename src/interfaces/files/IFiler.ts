import FileInfo from '@/services/classes/FileInfo.ts';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';

export default interface IFiler {
  addFile: (file: IElementPlusFile, fileInfo: FileInfo) => void;
}
