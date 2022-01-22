import Division from '@/classes/buildings/Division';
import News from '@/classes/news/News';
import IDivision from '@/interfaces/buildings/IDivision';
import INews from '@/interfaces/news/INews';
import INewsDivision from '@/interfaces/news/INewsDivision';

export default class NewsDivision implements INewsDivision {
  id?: string;
  news?: INews;
  newsId?: string;
  divisionId?: string;
  division?: IDivision;

  constructor(i?: INewsDivision) {
    if (!i) {
      return;
    }
    this.id = i.id;
    if (i.news) {
      this.news = new News(i.news);
    }
    this.newsId = i.newsId;
    if (i.division) {
      this.division = new Division(i.division);
    }
    this.divisionId = i.divisionId;
  }
}
