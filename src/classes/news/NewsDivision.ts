import Division from '@/classes/Division';
import INewsDivision from '@/interfaces/INewsDivision';
import INews from '@/interfaces/news/INews';
import ClassHelper from '@/services/ClassHelper';

export default class NewsDivision implements INewsDivision {
  id?: string;
  news?: INews;
  newsId?: string;
  divisionId?: string;
  division?: Division;

  constructor(i?: INewsDivision) {
    ClassHelper.BuildClass(this, i);
  }
}
