import SearchElementMeta from '@/classes/SearchElementMeta';
import SearchGroup from '@/classes/SearchGroup';
import ISearchElement from '@/interfaces/ISearchElement';
import ISearchElementMeta from '@/interfaces/ISearchElementMeta';
import ISearchGroup from '@/interfaces/ISearchGroup';

export default class SearchElement implements ISearchElement {
  value = '';
  label = '';
  description = '';
  route = '';
  searchGroup: ISearchGroup = new SearchGroup();
  searchElementMetas: ISearchElementMeta[] = [];
  constructor(i?: ISearchElement) {
    if (!i) {
      return;
    }
    this.value = i.value;
    this.label = i.label;
    this.description = i.description;
    this.route = i.route;
    if (i.searchGroup) {
      this.searchGroup = new SearchGroup(i.searchGroup);
    }
    if (i.searchElementMetas) {
      this.searchElementMetas = i.searchElementMetas.map((item: ISearchElementMeta) => new SearchElementMeta(item));
    }
  }
}
