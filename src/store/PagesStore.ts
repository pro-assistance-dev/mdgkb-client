import BaseStore from '@/services/BaseStore';
import Page from '@/services/classes/page/Page';
import PageSideMenu from '@/services/classes/page/PageSideMenu';
import HttpClient from '@/services/HttpClientS';
class S extends BaseStore<Page> {
  private isSideMenuDialogActive = false;
  private isPageSectionDialogActive = false;
  private index = 0;
  private pageSectionIndex = 0;
  private activeMenuId = 999;

  constructor() {
    super(Page, 'pages');
  }

  async GetBySlug(slug: string): Promise<void> {
    const res = await HttpClient.Get<Page>({ query: this.getUrl(`slug/${slug}`) });
    this.Set(res);
  }

  IsSideMenuDialogActive(): Ref<boolean> {
    return ref(this.isSideMenuDialogActive);
  }

  IsPageSectionDialogActive(): Ref<boolean> {
    return ref(this.isPageSectionDialogActive);
  }

  SideMenu(): Ref<PageSideMenu> {
    console.log(this.activeMenuId);

    return this.Item().pageSideMenus.find((el) => el.id === String(this.activeMenuId));
  }

  PageSection() {
    return this.Item().pageSideMenus[this.index].pageSections[this.pageSectionIndex];
  }

  ActiveMenuId() {
    return ref(this.activeMenuId);
  }

  SetSideMenuDialogActive(value: boolean) {
    this.isSideMenuDialogActive = value;
  }

  SetPageSectionDialogActive(value: boolean) {
    this.isPageSectionDialogActive = value;
  }

  SetIndex(value: number) {
    this.index = value;
  }

  SetActiveMenuId(value: number) {
    this.activeMenuId = value;
  }

  SetPageSectionIndex(value: number) {
    this.pageSectionIndex = value;
  }
}

const store: S = new S();
export default store;
