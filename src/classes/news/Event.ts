import Form from '@/classes/Form';
import EventApplication from '@/classes/news/EventApplication';
import IForm from '@/interfaces/IForm';
import IEvent from '@/interfaces/news/IEvent';
import IEventApplication from '@/interfaces/news/IEventApplication';

export default class Event implements IEvent {
  id?: string;
  newsId?: string;
  eventApplications: IEventApplication[] = [];
  form: IForm = new Form();
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
  }
}
