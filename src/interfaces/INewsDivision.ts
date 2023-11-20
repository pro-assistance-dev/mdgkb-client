import Division from '@/classes/Division';
import News from '@/classes/news/News';

export default interface INewsDivision {
  id?: string;
  newsId?: string;
  news?: News;
  divisionId?: string;
  division?: Division;
}
