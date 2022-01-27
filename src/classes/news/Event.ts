import Form from '@/classes/Form';
import EventApplication from '@/classes/news/EventApplication';
import News from '@/classes/news/News';
import IForm from '@/interfaces/IForm';
import IEvent from '@/interfaces/news/IEvent';
import IEventApplication from '@/interfaces/news/IEventApplication';
import INews from '@/interfaces/news/INews';

export default class Event implements IEvent {
  id?: string;
  newsId?: string;
  news: INews = new News();
  eventApplications: IEventApplication[] = [];
  form: IForm = new Form();
  startDate = new Date();
  endDate = new Date();
  constructor(i?: IEvent) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.newsId = i.newsId;
    if (i.eventApplications) {
      this.eventApplications = i.eventApplications.map((i: IEventApplication) => new EventApplication(i));
    }
    if (i.form) {
      this.form = new Form(i.form);
    }
    if (i.news) {
      this.news = new News(i.news);
    }
    this.startDate = i.startDate;
    this.endDate = i.endDate;
  }
}
