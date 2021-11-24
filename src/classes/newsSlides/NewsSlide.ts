import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import INewsSlide from '@/interfaces/newsSlides/INewsSlide';
import INewsSlideButton from '@/interfaces/newsSlides/INewsSlideButton';

import NewsSlideButton from './NewsSlideButton';

export default class NewsSlide implements INewsSlide {
  id?: string;
  title = '';
  content = '';
  color = '#000000';
  order = 1;
  desktopImg: IFileInfo = new FileInfo();
  desktopImgId?: string;
  laptopImg: IFileInfo = new FileInfo();
  laptopImgId?: string;
  tabletImg: IFileInfo = new FileInfo();
  tabletImgId?: string;
  mobileImg: IFileInfo = new FileInfo();
  mobileImgId?: string;
  newsSlideButtons: INewsSlideButton[] = [];
  newsSlideButtonsForDelete: string[] = [];

  constructor(newsSlide?: INewsSlide) {
    if (!newsSlide) {
      return;
    }
    this.id = newsSlide.id;
    this.title = newsSlide.title;
    this.content = newsSlide.content;
    this.color = newsSlide.color;
    this.order = newsSlide.order;
    this.desktopImgId = newsSlide.desktopImgId;
    if (newsSlide.desktopImg) {
      this.desktopImg = new FileInfo(newsSlide.desktopImg);
    }
    this.laptopImgId = newsSlide.laptopImgId;
    if (newsSlide.laptopImg) {
      this.laptopImg = new FileInfo(newsSlide.laptopImg);
    }
    this.tabletImgId = newsSlide.tabletImgId;
    if (newsSlide.tabletImg) {
      this.tabletImg = new FileInfo(newsSlide.tabletImg);
    }
    this.mobileImgId = newsSlide.mobileImgId;
    if (newsSlide.mobileImg) {
      this.mobileImg = new FileInfo(newsSlide.mobileImg);
    }
    if (newsSlide.newsSlideButtons) {
      this.newsSlideButtons = newsSlide.newsSlideButtons.map((item: INewsSlideButton) => new NewsSlideButton(item));
    }
  }
}
