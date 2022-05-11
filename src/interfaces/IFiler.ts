import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IFiler {
  id?: string;
  fileInfo: IFileInfo;
  order: number;
}
