import Pagination from '@/classes/filters/Pagination';
import SearchElement from '@/classes/SearchElement';
import SearchGroup from '@/classes/SearchGroup';
import IPagination from '@/interfaces/IPagination';
import ISearchElement from '@/interfaces/ISearchElement';
import ISearchGroup from '@/interfaces/ISearchGroup';
import ISearchObject from '@/interfaces/ISearchObject';
import Provider from '@/services/Provider/Provider';

export default class SearchModel {
  query = '';
  params = '';
  suggester = false;
  mustBeTranslated = true;
  options: ISearchElement[] = [];
  searchGroupId = '';
  searchGroups: ISearchGroup[] = [];
  searchGroup: ISearchGroup = new SearchGroup();
  searchObjects: ISearchObject[] = [];
  pagination: IPagination = new Pagination();

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

  async setSearchGroup(groupId: string | undefined): Promise<void> {
    const g = this.searchGroups.find((group: ISearchGroup) => group.id === groupId);
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
