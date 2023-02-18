import { v4 as uuidv4 } from 'uuid';

import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';
import ClassHelper from '@/services/ClassHelper';
import getExtension from '@/services/GetExtension';

export default class FileInfo implements IFileInfo {
  id?: string;
  originalName = '';
  fileSystemPath?: string;
  category?: string;
  file?: Blob;
  url = '';

  constructor(i?: IFileInfo) {
    ClassHelper.BuildClass(this, i);
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

  reset(): void {
    this.url = '';
    this.originalName = '';
    this.file = undefined;
    this.id = undefined;
    this.fileSystemPath = undefined;
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
    if (!this.id) {
      this.id = uuidv4();
    }
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

  isPdf(): boolean {
    return getExtension(this.originalName) === 'pdf';
  }
}
