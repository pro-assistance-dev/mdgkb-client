import FileInfo from '@/services/classes/FileInfo.ts';
import ClassHelper from '@/services/ClassHelper';

export default class NewsImage {
  id?: string;
  newsId?: string;
  order = 0;
  fileInfoId?: string;
  fileInfo: FileInfo = new FileInfo();
  description?: string;

  constructor(i?: NewsImage) {
    ClassHelper.BuildClass(this, i);
  }
}
