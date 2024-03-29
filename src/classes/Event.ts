import EventApplication from '@/classes/EventApplication';
import Form from '@/classes/Form';
import News from '@/classes/News';
import ClassHelper from '@/services/ClassHelper';

export default class Event {
  id?: string;
  newsId?: string;
  news: News = new News();
  @ClassHelper.GetClassConstructor(EventApplication)
  eventApplications: EventApplication[] = [];
  form: Form = new Form();
  startDate = new Date();
  endDate = new Date();

  constructor(i?: Event) {
    let a = 1;
    ClassHelper.BuildClass(this, i);
  }
}
