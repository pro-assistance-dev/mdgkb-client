import IFileInfo from '@/interfaces/files/IFileInfo';

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
