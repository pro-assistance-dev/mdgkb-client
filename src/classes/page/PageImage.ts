import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageImage from '@/interfaces/page/IPageImage';

export default class PageImage implements IPageImage {
  id?: string;
  pageId?: string;
  fileInfoId?: string;
  fileInfo?: IFileInfo;
  description?: string;

  constructor(pageImage?: IPageImage) {
    if (!pageImage) {
      return;
    }
    this.id = pageImage.id;
    this.fileInfoId = pageImage.fileInfoId;
    this.description = pageImage.description;
    if (pageImage.fileInfo) this.fileInfo = new FileInfo(pageImage.fileInfo);
  }
}
