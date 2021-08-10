import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';

export default class FileInfo implements IFileInfo {
  id?: string;
  originalName = '';
  fileSystemPath;
  category?;
  file?: File;

  constructor(i?: IFileInfo) {
    if (!i) return;

    this.id = i.id;
    this.originalName = i.originalName;
    this.fileSystemPath = i.fileSystemPath;
    this.category = i.category;
    this.file = i.file;
  }

  getImageUrl(): string {
    return `${process.env.VUE_APP_STATIC_URL}/${this.fileSystemPath}`;
  }

  getFileListObject(): IFilesList {
    return { name: this.originalName, url: this.getImageUrl() };
  }
}
