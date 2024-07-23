import { v4 as uuidv4 } from 'uuid';

import IFile from '@/services/interfaces/IFile';
import IFileInfo from '@/services/interfaces/IFileInfo';
import IFilesList from '@/services/interfaces/IFIlesList';

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

  getImageUrl(): string | URL {
    const u = this.url ? this.url : `${import.meta.env.VITE_APP_STATIC_URL}/${this.fileSystemPath}`;
    return new URL(u, import.meta.url);
  }

  getFileUrl(): string {
    const url = this.url ? this.url : `${import.meta.env.VITE_APP_STATIC_URL}/${this.fileSystemPath}`;
    return url;
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

  errorImg(event: Event, errorImgName?: string): void | URL {
    if (event.target) {
      let src = `/src/services/assets/img/avatar.webp`;
      if (errorImgName) {
        src = `@/assets/img/${errorImgName}`;
      }
      return new URL(src, import.meta.url);
    }
  }
  getFileInfos(): FileInfo[] {
    return [this];
  }

  isPdf(): boolean {
    return this.getExtension(this.originalName) === 'pdf';
  }

  getExtension(filename: string): string {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }
}
