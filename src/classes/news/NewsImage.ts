import INewsImage from '@/interfaces/news/INewsImage';
import IFileInfo from '@/interfaces/files/IFileInfo';
import FileInfo from '@/classes/File/FileInfo';

export default class NewsImage implements INewsImage {
  id?: string;
  newsId?: string;
  fileInfoId?: string;
  fileInfo?: IFileInfo;
  description?: string;

  constructor(i?: INewsImage) {
    if (!i) return;
    this.id = i.id;
    this.fileInfoId = i.fileInfoId;
    this.description = i.description;
    if (i.fileInfo) this.fileInfo = new FileInfo(i.fileInfo);
  }
}
