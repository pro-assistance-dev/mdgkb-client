import FileInfo from '@/classes/FileInfo';

export default interface ICarouselSlide {
  id?: string;
  title: string;
  content: string;
  carouselId?: string;
  fileInfoId?: string;
  buttonShow: boolean;
  buttonColor: string;
  fileInfo: FileInfo;
  link: string;
}
