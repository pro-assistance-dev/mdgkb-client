import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDivisionImage from '@/interfaces/IDivisionImage';

export default class DivisionImage implements IDivisionImage {
  id?: string;
  divisionId?: string;
  fileInfoId?: string;
  fileInfo?: IFileInfo;
  description?: string;

  constructor(i?: IDivisionImage) {
    if (!i) return;
    this.id = i.id;
    this.fileInfoId = i.fileInfoId;
    this.description = i.description;
    if (i.fileInfo) this.fileInfo = new FileInfo(i.fileInfo);
  }
}
