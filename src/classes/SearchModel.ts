import SearchGroup from '@/classes/SearchGroup';
import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchModel from '@/interfaces/ISearchModel';
import ISearchObject from '@/interfaces/ISearchObject';

export default class SearchModel implements ISearchModel {
  query = '';
  params = '';
  searchGroupId = '';
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
    return JSON.stringify(this);
  }
}
