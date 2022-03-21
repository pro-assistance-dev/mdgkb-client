import SearchElement from '@/classes/SearchElement';
import SearchGroupMetaColumn from '@/classes/SearchGroupMetaColumn';
import ISearchElement from '@/interfaces/ISearchElement';
import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchGroupMetaColumn from '@/interfaces/ISearchGroupMetaColumn';

export default class SearchGroup implements ISearchGroup {
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
  options: ISearchElement[] = [];
  searchGroupMetaColumns: ISearchGroupMetaColumn[] = [];
  constructor(i?: ISearchGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.key = i.key;
    this.label = i.label;
    this.order = i.order;
    this.route = i.route;
    this.active = i.active;
    this.descriptionColumn = i.descriptionColumn;
    this.table = i.table;
    this.searchColumn = i.searchColumn;
    this.labelColumn = i.labelColumn;
    this.valueColumn = i.valueColumn;

    if (i.options) {
      this.options = i.options.map((item: ISearchElement) => new SearchElement(item));
    }
    if (i.searchGroupMetaColumns) {
      this.searchGroupMetaColumns = i.searchGroupMetaColumns.map((item: ISearchGroupMetaColumn) => new SearchGroupMetaColumn(item));
    }
  }
}
