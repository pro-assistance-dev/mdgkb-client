import SearchElement from '@/classes/SearchElement';
import SearchGroupMetaColumn from '@/classes/SearchGroupMetaColumn';
import ClassHelper from '@/services/ClassHelper';

export default class SearchGroup {
  id?: string;
  key = '';
  label = '';
  order = 0;
  route = '';
  table = '';
  active = true;
  searchColumn = '';
  descriptionColumn = '';
  labelColumn = '';
  valueColumn = '';
  options: SearchElement[] = [];
  searchGroupMetaColumns: SearchGroupMetaColumn[] = [];
  constructor(i?: SearchGroup) {
    ClassHelper.BuildClass(this, i);
  }
}
