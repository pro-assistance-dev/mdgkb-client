import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IBanner {
  id?: string;
  name?: string;
  link?: string;
  listNumber?: number;
  fileInfo: IFileInfo;
  fileInfoId?: string;
}
