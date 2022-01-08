import { Orders } from '@/interfaces/filters/Orders';

export default interface ISortModel {
  id?: string;
  table: string;
  col: string;
  order: Orders | undefined;

  isAsc: () => boolean;
  isDesc: () => boolean;
}
