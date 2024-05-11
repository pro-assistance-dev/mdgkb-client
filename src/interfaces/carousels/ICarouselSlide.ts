import FileInfo from '@/services/classes/FileInfo.ts';

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
