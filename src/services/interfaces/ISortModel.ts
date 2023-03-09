import { LocationQuery } from 'vue-router';

import { Orders } from '@/services/interfaces/Orders';

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
  fromUrlQuery: (query: LocationQuery) => void;
  model: string;
  version: string;
}
