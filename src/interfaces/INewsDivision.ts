import IDivision from '@/interfaces/IDivision';
import INews from '@/interfaces/news/INews';

export default interface INewsDivision {
  id?: string;
  newsId?: string;
  news?: INews;
  divisionId?: string;
  division?: IDivision;
}
