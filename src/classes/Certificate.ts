import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICertificate from '@/interfaces/ICertificate';

export default class Certificate implements ICertificate {
  id?: string;
  description = '';
  scan: IFileInfo = new FileInfo();
  scanId?: string;
  employeeId?: string;

  constructor(i?: ICertificate) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.scanId = i.scanId;
    this.employeeId = i.employeeId;
    this.description = i.description;
    if (i.scan) {
      this.scan = new FileInfo(i.scan);
    }
  }

  getFileInfo(): IFileInfo {
    return this.scan;
  }
}
