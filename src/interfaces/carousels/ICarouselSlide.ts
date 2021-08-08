import IFileInfo from '@/interfaces/files/IFileInfo';
import INews from '@/interfaces/news/INews';

export default interface ICarouselSlide {
  id?: string;
  title: string;
  content: string;
  carouselId?: string;
  fileInfoId?: string;
  buttonShow: boolean;
  buttonColor: string;
  fileInfo?: IFileInfo;
  link: string;
}
