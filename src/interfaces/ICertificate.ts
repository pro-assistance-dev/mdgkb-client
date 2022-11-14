import IFileInfo from '@/interfaces/files/IFileInfo';

export default interface ICertificate {
  id?: string;
  scanId?: string;
  scan?: IFileInfo;
  employeeId?: string;
  description: string;
}
