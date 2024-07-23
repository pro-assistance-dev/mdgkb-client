import Pagination from '@/services/classes/filters/Pagination';
import SearchElement from '@/services/classes/SearchElement';
import SearchGroup from '@/services/classes/SearchGroup';
import ISearchObject from '@/services/interfaces/ISearchObject';

export default class SearchModel {
  query = '';
  key = '';
  params = '';
  suggester = false;
  mustBeTranslated = true;
  options: SearchElement[] = [];
  searchGroupId = '';
  searchGroups: SearchGroup[] = [];
  searchGroup: SearchGroup = new SearchGroup();
  searchObjects: ISearchObject[] = [];
  pagination: Pagination = new Pagination();
  count = 0;

  constructor(i?: SearchModel) {
    if (!i) {
      return;
    }
    this.query = i.query;
    if (i.searchGroups) {
      this.searchGroups = i.searchGroups.map((item: SearchGroup) => new SearchGroup(item));
    }
    if (i.searchGroup) {
      this.searchGroup = new SearchGroup(i.searchGroup);
    }
    if (i.options) {
      this.options = i.options.map((item: SearchElement) => new SearchElement(item));
    }
    this.count = i.count;
  }

  toUrl(): string {
    return JSON.stringify(this);
  }

  async setSearchGroup(groupId: string | undefined): Promise<void> {
    const g = this.searchGroups.find((group: SearchGroup) => group.id === groupId);
    if (g) {
      this.searchGroup = g;
    } else {
      this.searchGroup = new SearchGroup();
    }
  }

  async reproduceFromRoute(): Promise<void> {
    this.setQuery();
    await this.setSearchGroup(Router.Route().query.groupId as string);
  }

  setQuery(): void {
    const query = Router.Route().query.query;
    if (query) {
      this.query = query as string;
    }
  }
}
