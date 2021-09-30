import Page from '@/classes/page/Page';
import ISubSubMenu from '@/interfaces/menu/ISubSubMenu';

export default class SubSubMenu implements ISubSubMenu {
  id?: string;
  name = '';
  link = '';

  page = new Page();
  pageId?: string;

  subMenuId?: string;

  constructor(menu?: ISubSubMenu) {
    if (!menu) {
      return;
    }
    this.id = menu.id;
    this.name = menu.name;
    this.link = menu.link;

    if (this.page) {
      this.page = new Page(menu.page);
    }
    this.pageId = menu.pageId;

    this.subMenuId = menu.subMenuId;
  }
}
