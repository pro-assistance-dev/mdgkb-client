import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/classes/File/FileInfo';
import SubSubMenu from '@/classes/menu/SubSubMenu';
import Page from '@/classes/page/Page';
import Crud from '@/classes/shared/Crud';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import ISubMenu from '@/interfaces/menu/ISubMenu';
import ISubSubMenu from '@/interfaces/menu/ISubSubMenu';
import ICrud from '@/interfaces/shared/ICrud';

export default class SubMenu implements ISubMenu {
  id?: string;
  name = '';
  link = '';

  page = new Page();
  pageId?: string;
  order = 1;
  menuId?: string;

  subSubMenus: ISubSubMenu[] = [];
  subSubMenusForDelete: string[] = [];
  crud: ICrud = new Crud('menus', 'menus');

  iconId?: string;
  icon = new FileInfo();

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
    this.order = menu.order;
    this.menuId = menu.menuId;

    if (menu.subSubMenus) {
      this.subSubMenus = menu.subSubMenus.map((i: ISubSubMenu) => new SubSubMenu(i));
    }

    this.iconId = menu.iconId;
    if (menu.icon) {
      this.icon = new FileInfo(menu.icon);
    }
  }

  getLink(): string {
    if (this.isLink() && !this.isPageLink()) {
      return this.link;
    }
    if (!this.isLink() && this.isPageLink()) {
      return this.page.getLink();
    }
    return '';
  }

  withoutChildren(): boolean {
    return this.subSubMenus.length === 0;
  }

  isLink(): boolean {
    return this.link !== '';
  }

  isPageLink(): boolean {
    return this.pageId !== undefined && this.pageId !== '';
  }
  addFile(file: IElementPlusFile): void {
    if (!this.icon.id) {
      this.icon.id = uuidv4();
    }
    this.icon.originalName = file.name;
    this.icon.file = file.raw;
  }
}
