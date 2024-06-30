import BaseStore from '@/services/BaseStore';
import Page from '@/services/classes/page/Page';

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
export default function Store(): S {
  if (!store) {
    store = new S();
  }
  return store;
}
