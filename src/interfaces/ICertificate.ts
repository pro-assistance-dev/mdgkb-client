import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface ICertificate {
  id?: string;
  scanId?: string;
  scan?: IFileInfo;
  doctorId?: string;
  description: string;
}
