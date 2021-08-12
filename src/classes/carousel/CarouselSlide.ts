import FileInfo from '@/classes/File/FileInfo';
import ICarouselSlide from '@/interfaces/carousels/ICarouselSlide';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class CarouselSlide implements ICarouselSlide {
  id?: string;
  content = '';
  title = '';
  buttonColor = '';
  buttonShow = false;
  fileInfoId?: string;
  fileInfo: IFileInfo = new FileInfo();
  carouselId?: string;
  link = '';

  constructor(i?: ICarouselSlide) {
    if (!i) return;
    this.id = i.id;
    this.content = i.content;
    this.title = i.title;
    this.buttonColor = i.buttonColor;
    this.buttonShow = i.buttonShow;
    this.carouselId = i.carouselId;
    this.link = i.link;
    this.fileInfoId = i.fileInfoId;
    this.fileInfo = new FileInfo(i.fileInfo);
  }
}
