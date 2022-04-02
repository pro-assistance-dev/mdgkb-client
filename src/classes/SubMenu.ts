import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/classes/File/FileInfo';
import Page from '@/classes/page/Page';
import Crud from '@/classes/shared/Crud';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import ISubMenu from '@/interfaces/ISubMenu';
import ICrud from '@/interfaces/shared/ICrud';

export default class SubMenu implements ISubMenu {
  id?: string;
  name = '';
  link = '';
  selected = false;
  hide = false;
  editMode = false;
  color = '';
  background = '';

  page = new Page();
  pageId?: string;
  order = 0;
  menuId?: string;

  crud: ICrud = new Crud('menus', 'menus');

  iconId?: string;
  icon = new FileInfo();
  iconName = '';
  svgCode = '';

  constructor(i?: ISubMenu) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.hide = i.hide;
    this.link = i.link;
    this.iconName = i.iconName;
    this.svgCode = i.svgCode;

    if (this.page) {
      this.page = new Page(i.page);
    }
    this.pageId = i.pageId;
    this.order = i.order;
    this.menuId = i.menuId;
    this.color = i.color;

    this.iconId = i.iconId;
    if (i.icon) {
      this.icon = new FileInfo(i.icon);
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
