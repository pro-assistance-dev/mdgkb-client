import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class Certificate {
  id?: string;
  description = '';
  scan: IFileInfo = new FileInfo();
  scanId?: string;
  employeeId?: string;

  constructor(i?: Certificate) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfo(): IFileInfo {
    return this.scan;
  }
}
