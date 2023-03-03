import ClassHelper from '@/services/ClassHelper';

export default class SearchGroupMetaColumn {
  id?: string;
  name = '';
  label = '';

  constructor(i?: SearchGroupMetaColumn) {
    ClassHelper.BuildClass(this, i);
  }
}
