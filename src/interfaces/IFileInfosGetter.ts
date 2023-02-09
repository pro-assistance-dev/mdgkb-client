import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IFileInfosGetter {
  getFileInfos?: () => IFileInfo[];
}
