import SearchElementMeta from '@/classes/SearchElementMeta';
import SearchGroup from '@/classes/SearchGroup';
import ClassHelper from '@/services/ClassHelper';

export default class SearchElement {
  id = '';
  value = '';
  label = '';
  key = '';
  description = '';
  route = '';
  searchGroup: SearchGroup = new SearchGroup();
  searchElementMetas: SearchElementMeta[] = [];
  constructor(i?: SearchElement) {
    ClassHelper.BuildClass(this, i);
  }
}
