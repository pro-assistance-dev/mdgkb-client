import SubMenu from '@/classes/menu/SubMenu';
import Page from '@/classes/page/Page';
import Crud from '@/classes/shared/Crud';
import IMenu from '@/interfaces/menu/IMenu';
import ISubMenu from '@/interfaces/menu/ISubMenu';
import ICrud from '@/interfaces/shared/ICrud';

export default class Menu implements IMenu {
  id?: string;
  name = '';
  link = '';
  top = false;
  side = false;

  page = new Page();
  pageId?: string;

  subMenus: ISubMenu[] = [];
  subMenusForDelete: string[] = [];

  crud: ICrud = new Crud('menus');

  constructor(menu?: IMenu) {
    if (!menu) {
      return;
    }
    this.id = menu.id;
    this.name = menu.name;
    this.link = menu.link;
    this.top = menu.top;
    this.side = menu.side;

    if (this.page) {
      this.page = new Page(menu.page);
    }
    this.pageId = menu.pageId;

    if (menu.subMenus) {
      this.subMenus = menu.subMenus.map((i: ISubMenu) => new SubMenu(i));
    }
    this.crud = new Crud('menus');
  }

  getLink(): string {
    console.log(this.pageId);
    if (this.isLink() && !this.isPageLink()) {
      return this.link;
    }
    if (!this.isLink() && this.isPageLink()) {
      return this.page.getLink();
    }
    return '';
  }

  withoutChildren(): boolean {
    return this.subMenus.length === 0;
  }

  isLink(): boolean {
    return this.link !== '';
  }

  isPageLink(): boolean {
    return !!this.pageId && this.pageId !== '';
  }
}
