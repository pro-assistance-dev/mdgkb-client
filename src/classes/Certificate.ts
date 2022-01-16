import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/classes/File/FileInfo';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';

export default class Certificate implements ICertificate {
  id?: string;
  description = '';
  scan: IFileInfo = new FileInfo();
  scanId?: string;
  doctorId?: string;

  constructor(i?: ICertificate) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.scanId = i.scanId;
    this.doctorId = i.doctorId;
    this.description = i.description;
    if (i.scan) {
      this.scan = new FileInfo(i.scan);
    }
  }

  getFileInfo(): IFileInfo {
    return this.scan;
  }

  static CreateNewCertificate(file: IFile): ICertificate {
    const documentScan = new Certificate();
    documentScan.scan.originalName = file.name;
    documentScan.scan.file = file.raw;
    documentScan.scan.fileSystemPath = uuidv4();
    documentScan.scan.id = documentScan.scan.id ?? uuidv4();
    documentScan.scan.url = file.url;
    return documentScan;
  }
}
