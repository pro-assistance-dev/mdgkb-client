import { LocationQuery } from 'vue-router';

import { Operators } from '@/interfaces/filters/Operators';

export default class Cursor {
  operation: Operators = Operators.Lt;
  column = '';
  value?: unknown;
  initial = true;
  tableName = '';
  version = '';
  model = '';

  toUrlQuery(): string {
    let url = '';
    Object.keys(this).forEach((el, i) => {
      const value: any = this[el as keyof typeof this];
      if (value && url !== '?' && value.length !== 0) {
        if (i !== 0) {
          url += '&';
        }
        url += `curs${el}=${value}`;
      }
    });

    return url;
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
