import ClassHelper from '@/services/ClassHelper';

import FTSP from './filters/FTSP';

export default class HttpResponse<T> {
  data?: T;
  msg = '';
  @ClassHelper.GetClassConstructor(FTSP)
  ftsp?: FTSP;

  constructor(i?: HttpResponse<T>) {
    ClassHelper.BuildClass(this, i);
  }

  isEmpty(): boolean {
    return !this;
  }

  withoutFTSP(): boolean {
    return this.isEmpty() || !this.ftsp;
  }
}
