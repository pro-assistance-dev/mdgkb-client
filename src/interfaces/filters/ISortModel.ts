import { LocationQuery } from 'vue-router';

import { Orders } from '@/interfaces/filters/Orders';

export default interface ISortModel {
  id?: string;
  table: string;
  col: string;
  order: Orders | undefined;
  label: string;
  default: boolean;
  isAsc: () => boolean;
  isDesc: () => boolean;
  toUrlQuery: () => string;
  fromUrlQuery: (obj: LocationQuery) => void;
}
