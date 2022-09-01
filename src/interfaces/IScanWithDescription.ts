import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface IScanWithDescription {
  id?: string;
  scanId?: string;
  scan?: IFileInfo;
  description: string;
}