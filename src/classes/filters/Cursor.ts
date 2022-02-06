import { Operators } from '@/interfaces/filters/Operators';
import ICursor from '@/interfaces/ICursor';

export default class Cursor implements ICursor {
  operation: Operators = Operators.Lt;
  column = '';
  value?: unknown;
  initial = true;
}
