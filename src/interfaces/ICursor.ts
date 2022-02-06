import { Operators } from '@/interfaces/filters/Operators';

export default interface ICursor {
  initial: boolean;
  column: string;
  operation: Operators;
  value?: unknown;
}
