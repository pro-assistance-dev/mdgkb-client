import SubSubMenu from '@/classes/menu/SubSubMenu';
import Page from '@/classes/page/Page';
import Crud from '@/classes/shared/Crud';
import ISubMenu from '@/interfaces/menu/ISubMenu';
import ISubSubMenu from '@/interfaces/menu/ISubSubMenu';
import ICrud from '@/interfaces/shared/ICrud';

export default class SubMenu implements ISubMenu {
  id?: string;
  name = '';
  link = '';

  page = new Page();
  pageId?: string;

  menuId?: string;

  subSubMenus: ISubSubMenu[] = [];
  subSubMenusForDelete: string[] = [];
  crud: ICrud = new Crud('menus');

  constructor(menu?: ISubMenu) {
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

    this.menuId = menu.menuId;

    if (menu.subSubMenus) {
      this.subSubMenus = menu.subSubMenus.map((i: ISubSubMenu) => new SubSubMenu(i));
    }
  }
}
