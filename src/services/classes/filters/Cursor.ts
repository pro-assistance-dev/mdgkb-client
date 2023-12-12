import { LocationQuery } from 'vue-router';

import { Operators } from '@/services/interfaces/Operators';

export default class Cursor {
  operation: Operators = Operators.Lt;
  column = '';
  value?: unknown;
  initial = true;
  tableName = '';
  version = '';
  model = '';

  toUrlQuery(): string {
    const operation = this.operation ? `"operation":"${this.operation}"` : '';
    const column = this.column ? `"column":"${this.column}"` : '';
    const v = this.value && typeof (this.value as Date).toISOString === 'function' ? (this.value as Date).toISOString() : this.value;

    const value = v ? `"value":"${v}"` : '';
    const model = this.model ? `"model":"${this.model}"` : '';
    const initial = `"initial":${this.initial}`;

    return [operation, column, value, model, initial].filter((s: string) => s !== '').toString();
  }

  fromUrlQuery(obj: LocationQuery): void {
    if (obj.cursvalue) {
      this.value = obj.cursvalue;
    }
    if (obj.curscolumn) {
      this.column = String(obj.curscolumn);
    }
    if (obj.cursinitial !== undefined) {
      this.initial = Boolean(obj.cursinitial);
    }
    if (obj.curstableName) {
      this.tableName = String(obj.curstableName);
    }
    if (obj.cursoperation) {
      this.operation = obj.cursoperation as Operators;
    }
  }
}
