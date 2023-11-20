import News from '@/classes/news/News';

export default interface INewsWithCount {
  items: News[];
  count: number;
}
