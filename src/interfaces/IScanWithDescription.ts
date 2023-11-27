import FileInfo from '@/classes/FileInfo';

export default interface IScanWithDescription {
  id?: string;
  scanId?: string;
  scan?: FileInfo;
  description: string;
}
