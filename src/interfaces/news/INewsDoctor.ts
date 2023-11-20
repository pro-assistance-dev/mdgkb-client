import Doctor from '@/classes/Doctor';
import News from '@/classes/news/News';

export default interface INewsDoctor {
  id?: string;
  newsId?: string;
  news?: News;
  doctorId?: string;
  doctor?: Doctor;
}
