import IForm from '@/interfaces/IForm';
import IEventApplication from '@/interfaces/news/IEventApplication';
import INews from '@/interfaces/news/INews';

export default interface IEvent {
  id?: string;
  newsId?: string;
  news?: INews;
  startDate: Date;
  endDate: Date;
  eventApplications: IEventApplication[];
  form: IForm;
}
