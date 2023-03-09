import { LocationQuery } from 'vue-router';

import { Operators } from '@/services/interfaces/Operators';

export default interface ICursor {
  initial: boolean;
  column: string;
  operation: Operators;
  value?: unknown;
  tableName: string;

  toUrlQuery: () => string;
  fromUrlQuery: (obj: LocationQuery) => void;
}
