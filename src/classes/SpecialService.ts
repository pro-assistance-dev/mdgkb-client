import IFileInfo from '@/interfaces/files/IFileInfo';
import ISpecialService from '@/interfaces/ISpecialService';

import FileInfo from './File/FileInfo';

export default class SpecialService implements ISpecialService {
  id?: string;
  title = '';
  content = '';
  fileInfoId?: string;
  fileInfo: IFileInfo = new FileInfo();

  constructor(specialService?: ISpecialService) {
    if (!specialService) {
      return;
    }
    this.id = specialService.id;
    this.title = specialService.title;
    this.content = specialService.content;
    this.fileInfoId = specialService.fileInfoId;
    if (specialService.fileInfo) {
      this.fileInfo = new FileInfo(specialService.fileInfo);
    }
  }
}
