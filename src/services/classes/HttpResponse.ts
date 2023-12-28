import FilterQuery from 'src/services/classes/filters/FilterQuery';
import ClassHelper from 'src/services/ClassHelper';

export default class HttpResponse<T> {
  data?: T;
  msg = '';
  @ClassHelper.GetClassConstructor(FilterQuery)
  ftsp?: FilterQuery;

  constructor(i?: HttpResponse<T>) {
    ClassHelper.BuildClass(this, i);
  }
}
