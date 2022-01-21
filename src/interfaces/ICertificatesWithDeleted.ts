import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';

export default interface ICertificatesWithDeleted {
  certificates: ICertificate[];
  certificatesForDelete: string[];
  addCertificate: () => void;

  getFileInfos: () => IFileInfo[];
}
