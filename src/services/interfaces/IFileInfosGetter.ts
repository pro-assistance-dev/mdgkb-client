import FileInfo from '@/classes/FileInfo';

export default interface IFileInfosGetter {
  getFileInfos?: () => FileInfo[];
}
