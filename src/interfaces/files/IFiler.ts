import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import FileInfo from '@/services/classes/FileInfo.ts';

export default interface IFiler {
  addFile: (file: IElementPlusFile, fileInfo: FileInfo) => void;
}
