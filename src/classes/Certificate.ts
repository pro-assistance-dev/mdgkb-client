import FileInfo from '@/services/classes/FileInfo.ts';
import ClassHelper from '@/services/ClassHelper';

export default class Certificate {
  id?: string;
  description = '';
  scan: FileInfo = new FileInfo();
  scanId?: string;
  employeeId?: string;

  constructor(i?: Certificate) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfo(): FileInfo {
    return this.scan;
  }
}
