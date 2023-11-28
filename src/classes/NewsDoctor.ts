import Doctor from '@/classes/Doctor';
import News from '@/classes/News';
import ClassHelper from '@/services/ClassHelper';

export default class NewsDoctor {
  id?: string;
  news?: News;
  newsId?: string;
  doctorId?: string;
  doctor?: Doctor;

  constructor(i?: NewsDoctor) {
    ClassHelper.BuildClass(this, i);
  }
}
