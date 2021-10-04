import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IFiler {
  addFile: (file: IElementPlusFile, fileInfo: IFileInfo) => void;
}
