import FileInfo from '@/classes/FileInfo';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';

export default interface IFiler {
  addFile: (file: IElementPlusFile, fileInfo: FileInfo) => void;
}
