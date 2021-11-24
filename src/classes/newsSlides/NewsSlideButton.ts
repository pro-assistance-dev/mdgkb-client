import INewsSlideButton from '@/interfaces/newsSlides/INewsSlideButton';

export default class NewsSlideButton implements INewsSlideButton {
  id?: string;
  name = '';
  color = '#000000';
  backgroundColor = '#FFFFFF';
  order = 1;
  link = '';

  constructor(newsSlideButton?: INewsSlideButton) {
    if (!newsSlideButton) {
      return;
    }
    this.id = newsSlideButton.id;
    this.name = newsSlideButton.name;
    this.color = newsSlideButton.color;
    this.backgroundColor = newsSlideButton.backgroundColor;
    this.order = newsSlideButton.order;
    this.link = newsSlideButton.link;
  }
}
