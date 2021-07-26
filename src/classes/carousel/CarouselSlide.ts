import IFileInfo from '@/interfaces/files/IFileInfo';
import FileInfo from '@/classes/File/FileInfo';
import ICarouselSlide from '@/interfaces/carousels/ICarouselSlide';

export default class CarouselSlide implements ICarouselSlide {
  id?: string;
  content: string = '';
  title: string = '';
  fileInfoId?: string;
  fileInfo?: IFileInfo;
  carouselId: string = '';

  constructor(i?: ICarouselSlide) {
    if (!i) return;
    this.id = i.id;
    this.content = i.content;
    this.title = i.title;
    this.carouselId = i.carouselId;
    this.fileInfoId = i.fileInfoId;
    this.fileInfo = new FileInfo(i.fileInfo);
  }
}
