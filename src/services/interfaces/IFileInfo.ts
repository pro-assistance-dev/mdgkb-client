import IFile from '@/interfaces/files/IFile';
import IFilesList from '@/interfaces/files/IFIlesList';

export default interface IFileInfo {
  id?: string;
  category?: string;
  originalName: string;
  fileSystemPath?: string;
  file?: Blob;
  isDraft?: boolean;
  url: string;

  getImageUrl: () => string;
  getFileListObject: () => IFilesList;
  getFileUrl: () => string;

  uploadNewFile: (file: IFile) => void;
  setFile: (file: IFile) => void;
  uploadAndSetFile: (file: IFile) => void;
  clearFile: () => void;
  errorImg: (event: Event, errorImgName?: string) => void;
}
