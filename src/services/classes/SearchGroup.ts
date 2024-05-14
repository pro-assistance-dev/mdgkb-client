import SearchElement from '@/services/classes/SearchElement';
import SearchGroupMetaColumn from '@/services/classes/SearchGroupMetaColumn';
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
  @ClassHelper.GetClassConstructor(SearchElement)
  options: SearchElement[] = [];
  @ClassHelper.GetClassConstructor(SearchGroupMetaColumn)
  searchGroupMetaColumns: SearchGroupMetaColumn[] = [];

  constructor(i?: SearchGroup) {
    ClassHelper.BuildClass(this, i);
  }
}
