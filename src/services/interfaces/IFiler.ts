import FileInfo from '@/services/classes/FileInfo.ts';

export default interface IFiler {
  id?: string;
  fileInfo: FileInfo;
  order: number;
}
