import IFileInfo from '@/interfaces/files/IFileInfo';
import INewsSlideButton from '@/interfaces/newsSlides/INewsSlideButton';

export default interface INewsSlide {
  id?: string;
  title: string;
  content: string;
  desktopImg: IFileInfo;
  desktopImgId?: string;
  laptopImg: IFileInfo;
  laptopImgId?: string;
  tabletImg: IFileInfo;
  tabletImgId?: string;
  mobileImg: IFileInfo;
  mobileImgId?: string;
  newsSlideButtons: INewsSlideButton[];
  newsSlideButtonsForDelete: string[];
}
