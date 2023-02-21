import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDivisionImage from '@/interfaces/IDivisionImage';
import ClassHelper from '@/services/ClassHelper';

export default class DivisionImage implements IDivisionImage {
  id?: string;
  divisionId?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo = new FileInfo();
  description?: string;
  order = 0;

  constructor(i?: IDivisionImage) {
    ClassHelper.BuildClass(this, i);
  }
}
