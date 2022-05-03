import SearchElement from '@/classes/SearchElement';
import SearchGroup from '@/classes/SearchGroup';
import ISearchElement from '@/interfaces/ISearchElement';
import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchModel from '@/interfaces/ISearchModel';
import ISearchObject from '@/interfaces/ISearchObject';

export default class SearchModel implements ISearchModel {
  query = '';
  params = '';
  suggester = false;
  mustBeTranslated = true;
  options: ISearchElement[] = [];
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
    if (i.options) {
      this.options = i.options.map((item: ISearchElement) => new SearchElement(item));
    }
  }

  toUrl(): string {
    return JSON.stringify(this);
  }

  setSearchGroup(groupId: string | undefined): void {
    if (!groupId) {
      this.searchGroups.forEach((group: ISearchGroup) => {
        group.active = true;
      });
      return;
    }
    this.searchGroups.forEach((group: ISearchGroup) => {
      group.active = group.id === groupId;
    });
  }
}
