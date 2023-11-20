import News from '@/classes/news/News';
import IForm from '@/interfaces/IForm';
import IEventApplication from '@/interfaces/news/IEventApplication';

export default interface IEvent {
  id?: string;
  newsId?: string;
  news: News;
  startDate: Date;
  endDate: Date;
  eventApplications: IEventApplication[];
  form: IForm;
}
