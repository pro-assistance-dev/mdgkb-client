import News from '@/classes/news/News';

export default interface IWithNews {
  id?: string;
  newsId?: string;
  news?: News;
}
