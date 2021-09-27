import IFilesList from '@/interfaces/files/IFIlesList';

export default interface IFileInfo {
  id?: string;
  category?: string;
  originalName: string;
  fileSystemPath?: string;
  file?: Blob;
  isDraft?: boolean;

  getImageUrl?: () => string;
  getFileListObject: () => IFilesList;
  getFileUrl: () => string;
}
