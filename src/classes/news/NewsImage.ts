import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import INewsImage from '@/interfaces/news/INewsImage';

export default class NewsImage implements INewsImage {
  id?: string;
  newsId?: string;
  order = 0;
  fileInfoId?: string;
  fileInfo: IFileInfo = new FileInfo();
  description?: string;

  constructor(i?: INewsImage) {
    if (!i) return;
    this.id = i.id;
    this.fileInfoId = i.fileInfoId;
    this.order = i.order;
    this.description = i.description;
    if (i.fileInfo) this.fileInfo = new FileInfo(i.fileInfo);
  }
}
