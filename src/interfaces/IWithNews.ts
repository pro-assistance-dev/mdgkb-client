import News from '@/classes/News';

export default interface IWithNews {
  id?: string;
  newsId?: string;
  news?: News;
}
