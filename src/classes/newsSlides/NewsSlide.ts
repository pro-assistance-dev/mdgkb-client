import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

import NewsSlideButton from './NewsSlideButton';

export default class NewsSlide {
  id?: string;
  title = '';
  content = '';
  color = '#000000';
  order = 1;
  desktopImg = new FileInfo();
  desktopImgId?: string;
  laptopImg = new FileInfo();
  laptopImgId?: string;
  tabletImg = new FileInfo();
  tabletImgId?: string;
  mobileImg = new FileInfo();
  mobileImgId?: string;
  @ClassHelper.GetClassConstructorForArray(NewsSlideButton)
  newsSlideButtons: NewsSlideButton[] = [];
  newsSlideButtonsForDelete: string[] = [];

  constructor(i?: NewsSlide) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return [this.desktopImg, this.laptopImg, this.tabletImg, this.mobileImg];
  }
}
