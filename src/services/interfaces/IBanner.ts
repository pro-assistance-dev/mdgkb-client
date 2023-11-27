import FileInfo from '@/classes/FileInfo';

export default interface IBanner {
  id?: string;
  name?: string;
  link?: string;
  listNumber?: number;
  fileInfo: FileInfo;
  fileInfoId?: string;

  getFileInfos: () => FileInfo[];
}
