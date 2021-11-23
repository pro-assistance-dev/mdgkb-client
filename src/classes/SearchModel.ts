import SearchGroup from '@/classes/SearchGroup';
import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchModel from '@/interfaces/ISearchModel';

export default class SearchModel implements ISearchModel {
  query = '';
  searchGroupId = '';
  searchGroups: ISearchGroup[] = [];

  constructor(i?: SearchModel) {
    if (!i) {
      return;
    }
    this.query = i.query;
    if (i.searchGroups) {
      this.searchGroups = i.searchGroups.map((item: ISearchGroup) => new SearchGroup(item));
    }
  }

  toUrl(): string {
    // return `{query=${this.query},searchGroupId=${this.searchGroupId}}`;
    return JSON.stringify(this);
  }
}
