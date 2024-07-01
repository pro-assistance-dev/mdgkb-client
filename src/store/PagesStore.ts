import BaseStore from '@/services/BaseStore';
import Page from '@/services/classes/page/Page';

class S extends BaseStore<Page> {
  private isSideMenuDialogActive = false;
  private isPageSectionDialogActive = false;
  private index = 0;
  private pageSectionIndex = 0;
  private activeMenuId = 999;

  constructor() {
    super(Page, 'pages');
  }

  IsSideMenuDialogActive(): boolean {
    return this.isSideMenuDialogActive;
  }
  IsPageSectionDialogActive(): boolean {
    return this.isPageSectionDialogActive;
  }
  SideMenu() {
    return this.item.pageSideMenus.find((el) => el.id === this.activeMenuId);
  }
  PageSection() {
    return this.item.pageSideMenus[this.index].pageSections[this.pageSectionIndex];
  }
  ActiveMenuId() {
    return this.activeMenuId;
  }
}

let store: S;
export default function Store(): S {
  if (!store) {
    store = new S();
  }
  return store;
}
