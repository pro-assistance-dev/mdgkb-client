import FileInfo from '@/services/classes/FileInfo.ts';
import ClassHelper from '@/services/ClassHelper';

export default class DivisionImage {
  id?: string;
  divisionId?: string;
  fileInfoId?: string;
  fileInfo: FileInfo = new FileInfo();
  description?: string;
  order = 0;

  constructor(i?: DivisionImage) {
    ClassHelper.BuildClass(this, i);
  }
}
