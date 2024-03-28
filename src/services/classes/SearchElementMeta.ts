import ClassHelper from '@/services/ClassHelper';

export default class SearchElementMeta {
  name = '';
  value = '';

  constructor(i?: SearchElementMeta) {
    ClassHelper.BuildClass(this, i);
  }
}
