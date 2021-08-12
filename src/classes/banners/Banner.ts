import FileInfo from '@/classes/File/FileInfo';
import IBanner from '@/interfaces/banners/IBanner';

export default class Banner implements IBanner {
  id?: string;
  name?: string;
  link?: string;
  listNumber?: number;
  fileInfo = new FileInfo();
  fileInfoId?: string;

  constructor(i?: IBanner) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
    this.link = i.link;
    this.listNumber = i.listNumber;
    this.fileInfoId = i.fileInfoId;
    this.fileInfo = new FileInfo(i.fileInfo);
  }
}
