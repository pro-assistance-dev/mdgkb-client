import Doctor from '@/classes/Doctor';
import News from '@/classes/news/News';
import IDoctor from '@/interfaces/IDoctor';
import INews from '@/interfaces/news/INews';
import INewsDoctor from '@/interfaces/news/INewsDoctor';

export default class NewsDoctor implements INewsDoctor {
  id?: string;
  news?: INews;
  newsId?: string;
  doctorId?: string;
  doctor?: IDoctor;

  constructor(i?: INewsDoctor) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.news) {
      this.news = new News(i.news);
    }
    this.newsId = i.newsId;
    if (i.doctor) {
      this.doctor = new Doctor(i.doctor);
    }
    this.doctorId = i.doctorId;
  }
}
