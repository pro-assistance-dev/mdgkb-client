import SearchGroup from '@/classes/SearchGroup';
import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchModel from '@/interfaces/ISearchModel';
import ISearchObject from '@/interfaces/ISearchObject';
import { SearchModes } from '@/interfaces/SearchModes';

export default class SearchModel implements ISearchModel {
  query = '';
  params = '';
  searchGroupId = '';
  searchMode: SearchModes = SearchModes.SearchModeMain;
  searchGroups: ISearchGroup[] = [];
  searchGroup: ISearchGroup = new SearchGroup();
  searchObjects: ISearchObject[] = [];

  constructor(i?: SearchModel) {
    if (!i) {
      return;
    }
    this.query = i.query;
    if (i.searchGroups) {
      this.searchGroups = i.searchGroups.map((item: ISearchGroup) => new SearchGroup(item));
    }
    if (i.searchGroup) {
      this.searchGroup = new SearchGroup(i.searchGroup);
    }
  }

  toUrl(): string {
    // return `{query=${this.query},searchGroupId=${this.searchGroupId}}`;
    return JSON.stringify(this);
  }
}
