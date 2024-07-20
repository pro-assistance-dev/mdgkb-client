import SearchElement from '@/classes/SearchElement';
import SearchGroup from '@/classes/SearchGroup';
import SearchModel from '@/services/classes/SearchModel';
import HttpClient from '@/services/HttpClientS';

class S {
  private isSearchDrawerOpen = ref(false);
  private searchModel = reactive(new SearchModel());
  private searchGroups = reactive([]);
  private count = 0;

  async Search(searchModel: SearchModel): Promise<void> {
    const item = await HttpClient.Get<SearchModel>({ query: `?key=${searchModel.key}&query=${searchModel.query}` });
    if (item && item.searchGroup) {
      item.searchGroup.options.forEach((opt: SearchElement) => {
        searchModel.searchObjects.push({ id: opt.id, value: opt.value, label: opt.label, description: opt.description });
      });
    }
  }

  async mainSearch(searchModel: SearchModel): Promise<void> {
    this.SetSearchModel(await HttpClient.Get<SearchModel>({ query: `/main?searchModel=${searchModel.toUrl()}` }));
  }
  async Full(searchModel: SearchModel): Promise<void> {
    searchModel.options = [];
    searchModel.searchGroups.forEach((s: SearchGroup) => {
      s.options = [];
    });
    const res = await HttpClient.Get<SearchModel>({ query: `main?searchModel=${searchModel.toUrl()}` });
    this.SetSearchModel(res as SearchModel);
  }

  ToggleDrawer(isOpen: boolean) {
    this.isSearchDrawerOpen = isOpen;
    this.searchModel = new SearchModel();
  }
  SetSearchModel(searchModel: void | SearchModel): void {
    if (!searchModel) {
      return;
    }
    this.searchModel = new SearchModel(searchModel);
  }
  SetSearchGroups(searchGroups: SearchGroup[]): void {
    // this.searchModel.searchGroups = searchGroups.map((item: SearchGroup) => new SearchGroup(item));
  }

  IsSearchDrawerOpen(): Ref<boolean> {
    return this.isSearchDrawerOpen;
  }
  SearchModel(): SearchModel {
    return this.searchModel;
  }

  SearchGroups(): SearchGroup[] {
    return this.searchGroups;
  }

  Count(): number {
    return this.count;
  }
}

const store: S = new S();
export default store;
