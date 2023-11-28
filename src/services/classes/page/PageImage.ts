import FileInfo from '@/classes/FileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class PageImage {
  id?: string;
  pageId?: string;
  fileInfoId?: string;
  @ClassHelper.GetClassConstructor(FileInfo)
  fileInfo?: FileInfo;
  description?: string;

  constructor(i?: PageImage) {
    ClassHelper.BuildClass(this, i);
  }
}
