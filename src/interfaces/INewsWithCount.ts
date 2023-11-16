import INews from '@/interfaces/news/INews';

export default interface INewsWithCount {
  items: INews[];
  count: number;
}
