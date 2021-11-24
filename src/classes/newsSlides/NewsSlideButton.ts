import INewsSlideButton from '@/interfaces/newsSlides/INewsSlideButton';

export default class NewsSlideButton implements INewsSlideButton {
  id?: string;
  name = '';
  color = '';
  backgroundColor = '';
  link = '';

  constructor(newsSlideButton?: INewsSlideButton) {
    if (!newsSlideButton) {
      return;
    }
    this.id = newsSlideButton.id;
    this.name = newsSlideButton.name;
    this.color = newsSlideButton.color;
    this.backgroundColor = newsSlideButton.backgroundColor;
    this.link = newsSlideButton.link;
  }
}
