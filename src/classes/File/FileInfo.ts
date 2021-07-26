import IFileInfo from '@/interfaces/files/IFileInfo';

export default class FileInfo implements IFileInfo {
  id?: string;
  originalName: string = '';
  filenameDisk: string = '';
  category = '';
  file?: File;

  constructor(i?: IFileInfo) {
    if (!i) return;
    this.id = i.id;
    this.originalName = i.originalName;
    this.filenameDisk = i.filenameDisk;
    this.category = i.category;
    this.file = i.file;
  }
}
