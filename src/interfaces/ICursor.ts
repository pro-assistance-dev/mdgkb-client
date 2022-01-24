import { Operators } from '@/interfaces/filters/Operators';

export default interface ICursor {
  initial: boolean;
  operation: Operators;
  value?: unknown;
}
