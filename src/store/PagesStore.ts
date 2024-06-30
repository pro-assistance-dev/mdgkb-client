import Page from '@/classes/pages/Page';
import BaseStore from '@/services/BaseStore';

class S extends BaseStore<Page> {
  isSideMenuDialogActive = false;
  isPageSectionDialogActive = false;
  index = 0;
  pageSectionIndex = 0;
  activeMenuId = 999;
  constructor() {
    super(Page, 'pages');
  }
}

let store: S;
export default function PagesStore(): S {
  if (!store) {
    store = new S();
  }
  return store;
}
