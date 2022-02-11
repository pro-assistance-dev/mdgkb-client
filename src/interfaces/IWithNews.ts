import INews from '@/interfaces/news/INews';

export default interface IWithNews {
  id?: string;
  newsId?: string;
  news?: INews;
}
