import INews from '@/interfaces/news/INews';

export default interface INewsWithCount {
  news: INews[];
  count: number;
}
