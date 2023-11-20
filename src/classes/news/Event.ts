import Form from '@/classes/Form';
import News from '@/classes/news/News';
import IForm from '@/interfaces/IForm';
import IEvent from '@/interfaces/news/IEvent';
import IEventApplication from '@/interfaces/news/IEventApplication';
import ClassHelper from '@/services/ClassHelper';

export default class Event implements IEvent {
  id?: string;
  newsId?: string;
  news: News = new News();
  eventApplications: IEventApplication[] = [];
  form: IForm = new Form();
  startDate = new Date();
  endDate = new Date();
  constructor(i?: IEvent) {
    ClassHelper.BuildClass(this, i);
  }
}
