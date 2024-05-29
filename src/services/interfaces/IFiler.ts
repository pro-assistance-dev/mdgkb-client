import FileInfo from '@/classes/FileInfo';

export default interface IFiler {
  id?: string;
  fileInfo: FileInfo;
  order: number;
}
