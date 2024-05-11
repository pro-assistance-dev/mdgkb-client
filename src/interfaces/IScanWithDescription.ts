import FileInfo from '@/services/classes/FileInfo.ts';

export default interface IScanWithDescription {
  id?: string;
  scanId?: string;
  scan?: FileInfo;
  description: string;
}
