import FileInfo from '@/classes/File/FileInfo';
import IDocument from '@/interfaces/document/IDocument';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class Document implements IDocument {
  id?: string;
  name = '';
  fileInfo: IFileInfo = new FileInfo();
  fileInfoId?: string;

  constructor(document?: IDocument) {
    if (!document) {
      return;
    }
    this.id = document?.id;
    this.name = document?.name ?? '';
    if (document.fileInfo) {
      this.fileInfo = new FileInfo(document.fileInfo);
    }
    this.fileInfoId = document.fileInfoId;
  }

  addFile(file: IElementPlusFile): void {
    this.fileInfo.originalName = file.name;
    this.fileInfo.file = file.raw;
  }
}
