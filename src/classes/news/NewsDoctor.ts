import Doctor from '@/classes/Doctor';
import News from '@/classes/news/News';
import INewsDoctor from '@/interfaces/news/INewsDoctor';

export default class NewsDoctor implements INewsDoctor {
  id?: string;
  news?: News;
  newsId?: string;
  doctorId?: string;
  doctor?: Doctor;

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
