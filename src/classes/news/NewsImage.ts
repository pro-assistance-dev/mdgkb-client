import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import INewsImage from '@/interfaces/news/INewsImage';
import ClassHelper from '@/services/ClassHelper';

export default class NewsImage implements INewsImage {
  id?: string;
  newsId?: string;
  order = 0;
  fileInfoId?: string;
  fileInfo: IFileInfo = new FileInfo();
  description?: string;

  constructor(i?: INewsImage) {
    ClassHelper.BuildClass(this, i);
  }
}
