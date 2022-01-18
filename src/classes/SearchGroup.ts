import SearchElement from '@/classes/SearchElement';
import ISearchElement from '@/interfaces/ISearchElement';
import ISearchGroup from '@/interfaces/ISearchGroup';

export default class SearchGroup implements ISearchGroup {
  id?: string;
  key = '';
  label = '';
  order = '';
  route = '';
  table = '';
  searchColumn = '';
  labelColumn = '';
  valueColumn = '';
  options: ISearchElement[] = [];

  constructor(i?: ISearchGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.key = i.key;
    this.label = i.label;
    this.order = i.order;
    this.route = i.route;
    this.table = i.table;
    this.searchColumn = i.searchColumn;
    this.labelColumn = i.labelColumn;
    this.valueColumn = i.valueColumn;

    if (i.options) {
      this.options = i.options.map((item: ISearchElement) => new SearchElement(item));
    }
  }
}
