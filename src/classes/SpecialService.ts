import FileInfo from '@/services/classes/FileInfo.ts';
import ClassHelper from '@/services/ClassHelper';

export default class SpecialService {
  id?: string;
  title = '';
  content = '';
  link = '';
  fileInfoId?: string;
  fileInfo: FileInfo = new FileInfo();

  constructor(i?: SpecialService) {
    ClassHelper.BuildClass(this, i);
  }
}
