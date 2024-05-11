import FileInfo from '@/services/classes/FileInfo.ts';
import ClassHelper from '@/services/ClassHelper';

export default class Banner {
  id?: string;
  name?: string;
  link?: string;
  listNumber?: number;
  fileInfo = new FileInfo();
  fileInfoId?: string;

  constructor(i?: Banner) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    fileInfos.push(this.fileInfo);
    return fileInfos;
  }
}
