import News from '@/classes/News';

export default interface INewsWithCount {
  items: News[];
  count: number;
}
