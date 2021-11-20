import IForm from '@/interfaces/IForm';
import IEventApplication from '@/interfaces/news/IEventApplication';

export default interface IEvent {
  id?: string;
  newsId?: string;
  eventApplications: IEventApplication[];
  form: IForm;
}
