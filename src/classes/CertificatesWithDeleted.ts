import Certificate from '@/classes/Certificate';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';
import ICertificatesWithDeleted from '@/interfaces/ICertificatesWithDeleted';

export default class CertificatesWithDeleted implements ICertificatesWithDeleted {
  id?: string;
  certificates: ICertificate[] = [];
  certificatesForDelete: string[] = [];

  constructor(i?: ICertificatesWithDeleted) {
    if (!i) {
      return;
    }
    if (i.certificates) {
      this.certificates = i.certificates.map((item: ICertificate) => new Certificate(item));
    }
  }

  addCertificate(): void {
    this.certificates.push(new Certificate());
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.certificates.forEach((i: ICertificate) => {
      if (i.scan) {
        fileInfos.push(i.scan);
      }
    });
    return fileInfos;
  }
}
