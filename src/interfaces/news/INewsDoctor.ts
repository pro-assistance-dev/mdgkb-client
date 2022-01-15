import IDoctor from '@/interfaces/IDoctor';
import INews from '@/interfaces/news/INews';

export default interface INewsDoctor {
  id?: string;
  newsId?: string;
  news?: INews;
  doctorId?: string;
  doctor?: IDoctor;
}
