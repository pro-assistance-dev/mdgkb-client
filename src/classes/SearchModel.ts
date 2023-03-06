import Pagination from '@/classes/filters/Pagination';
import SearchElement from '@/classes/SearchElement';
import SearchGroup from '@/classes/SearchGroup';
import IPagination from '@/interfaces/IPagination';
import ISearchObject from '@/services/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

export default class SearchModel {
  query = '';
  params = '';
  suggester = false;
  mustBeTranslated = true;
  options: SearchElement[] = [];
  searchGroupId = '';
  searchGroups: SearchGroup[] = [];
  searchGroup: SearchGroup = new SearchGroup();
  searchObjects: ISearchObject[] = [];
  pagination: IPagination = new Pagination();
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
      await Provider.router.replace({ query: { query: this.query, groupId: groupId } });
    } else {
      this.searchGroup = new SearchGroup();
      await Provider.router.replace({ query: { query: this.query } });
    }
  }

  async reproduceFromRoute(): Promise<void> {
    this.setQuery();
    await this.setSearchGroup(Provider.route().query.groupId as string);
  }

  setQuery(): void {
    const query = Provider.route().query.query;
    if (query) {
      this.query = query as string;
    }
  }
}
