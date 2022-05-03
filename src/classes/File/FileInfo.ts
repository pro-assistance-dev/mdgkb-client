import { v4 as uuidv4 } from 'uuid';

import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';

export default class FileInfo implements IFileInfo {
  id?: string;
  originalName = '';
  fileSystemPath;
  category?;
  file?: Blob;
  url = '';

  constructor(i?: IFileInfo) {
    if (!i) {
      return;
    }

    this.id = i.id;
    this.originalName = i.originalName;
    this.fileSystemPath = i.fileSystemPath;
    this.category = i.category;
    this.file = i.file;
    this.url = i.url;
  }

  getImageUrl(): string {
    return this.url ? this.url : `${process.env.VUE_APP_STATIC_URL}/${this.fileSystemPath}`;
  }

  getFileUrl(): string {
    return this.url ? this.url : `${process.env.VUE_APP_STATIC_URL}/${this.fileSystemPath}`;
  }

  getFileListObject(): IFilesList {
    return { name: this.originalName, url: this.getImageUrl() };
  }

  static CreatePreviewFile(file: IFile, category: string, id?: string): IFileInfo {
    const fileInfo = new FileInfo();
    fileInfo.id = id ?? uuidv4();
    fileInfo.originalName = file.name;
    fileInfo.file = file.blob;
    fileInfo.fileSystemPath = uuidv4();
    fileInfo.category = category;
    return fileInfo;
  }

  uploadNewFile(file: IFile): void {
    this.id = this.id ?? uuidv4();
    this.originalName = file.name;
    this.file = file.blob;
    this.fileSystemPath = uuidv4();
  }

  setFile(file: IFile): void {
    this.file = file.blob;
    this.url = file.src;
  }

  uploadAndSetFile(file: IFile): void {
    this.uploadNewFile(file);
    this.setFile(file);
    this.file = file.raw;
    this.url = file.url;
  }

  clearFile(): void {
    this.url = '';
    this.file = undefined;
    this.fileSystemPath = '';
    this.originalName = '';
    this.category = '';
  }

  errorImg(event: Event, errorImgName?: string): void {
    if (event.target) {
      (event.target as HTMLImageElement).src = errorImgName ? require(`@/assets/img/${errorImgName}`) : require('@/assets/img/avatar.webp');
    }
  }
}
