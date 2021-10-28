import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/classes/File/FileInfo';
import SubMenu from '@/classes/menu/SubMenu';
import Page from '@/classes/page/Page';
import Crud from '@/classes/shared/Crud';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IMenu from '@/interfaces/menu/IMenu';
import ISubMenu from '@/interfaces/menu/ISubMenu';
import ISubSubMenu from '@/interfaces/menu/ISubSubMenu';
import ICrud from '@/interfaces/shared/ICrud';

export default class Menu implements IMenu {
  id?: string;
  name = '';
  link = '';
  top = true;
  side = true;
  order = 0;

  page = new Page();
  pageId?: string;

  subMenus: ISubMenu[] = [];
  subMenusForDelete: string[] = [];

  iconId?: string;
  icon = new FileInfo();

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
    this.order = menu.order;

    if (this.page) {
      this.page = new Page(menu.page);
    }
    this.pageId = menu.pageId;

    if (menu.subMenus) {
      this.subMenus = menu.subMenus.map((i: ISubMenu) => new SubMenu(i));
    }
    this.crud = new Crud('menus');

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
    return this.subMenus.length === 0;
  }

  isLink(): boolean {
    return this.link !== '';
  }

  isPageLink(): boolean {
    return !!this.pageId && this.pageId !== '';
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(this.icon);
    this.subMenus.forEach((subMenu: ISubMenu) => {
      fileInfos.push(subMenu.icon);
      subMenu.subSubMenus.forEach((subSubMenu: ISubSubMenu) => fileInfos.push(subSubMenu.icon));
    });
    return fileInfos;
  }

  addFile(file: IElementPlusFile): void {
    if (!this.icon.id) {
      this.icon.id = uuidv4();
    }
    this.icon.originalName = file.name;
    this.icon.file = file.raw;
  }
}
