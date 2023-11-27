import Division from '@/classes/Division';
import News from '@/classes/News';
import ClassHelper from '@/services/ClassHelper';

export default class NewsDivision {
  id?: string;
  news: News = new News();
  newsId?: string;
  divisionId?: string;
  division?: Division;

  constructor(i?: NewsDivision) {
    ClassHelper.BuildClass(this, i);
  }
}
