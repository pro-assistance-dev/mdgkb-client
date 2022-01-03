import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/classes/File/FileInfo';
import Page from '@/classes/page/Page';
import SubMenu from '@/classes/SubMenu';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IMenu from '@/interfaces/IMenu';
import ISubMenu from '@/interfaces/ISubMenu';

export default class Menu implements IMenu {
  id?: string;
  name = '';
  link = '';
  top = true;
  side = true;
  order = 0;
  selected = false;
  editMode = false;

  page = new Page();
  pageId?: string;

  subMenus: ISubMenu[] = [];
  subMenusForDelete: string[] = [];

  iconId?: string;
  icon = new FileInfo();

  // crud: ICrud = new Crud('menus', 'menus');

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

  addSubMenu(): void {
    this.subMenus.push(new SubMenu());
  }

  removeSubMenu(index: number): void {
    const idForDelete = this.subMenus[index].id;
    if (idForDelete) {
      this.subMenusForDelete.push(idForDelete);
    }
    this.subMenus.splice(index, 1);
  }
}
