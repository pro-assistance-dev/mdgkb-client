import { LocationQuery } from 'vue-router';

import { Operators } from '@/interfaces/filters/Operators';

export default interface ICursor {
  initial: boolean;
  column: string;
  operation: Operators;
  value?: unknown;
  tableName: string;

  toUrlQuery: () => string;
  fromUrlQuery: (obj: LocationQuery) => void;
}
