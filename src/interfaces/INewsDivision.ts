import Division from '@/classes/Division';
import INews from '@/interfaces/news/INews';

export default interface INewsDivision {
  id?: string;
  newsId?: string;
  news?: INews;
  divisionId?: string;
  division?: Division;
}
