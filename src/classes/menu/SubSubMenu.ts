import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/classes/File/FileInfo';
import Page from '@/classes/page/Page';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import ISubSubMenu from '@/interfaces/menu/ISubSubMenu';

export default class SubSubMenu implements ISubSubMenu {
  id?: string;
  name = '';
  link = '';
  order = 1;
  page = new Page();
  pageId?: string;

  subMenuId?: string;

  iconId?: string;
  icon = new FileInfo();

  constructor(menu?: ISubSubMenu) {
    if (!menu) {
      return;
    }
    this.id = menu.id;
    this.name = menu.name;
    this.link = menu.link;
    this.order = menu.order;

    if (this.page) {
      this.page = new Page(menu.page);
    }
    this.pageId = menu.pageId;

    this.subMenuId = menu.subMenuId;

    this.iconId = menu.iconId;
    if (menu.icon) {
      this.icon = new FileInfo(menu.icon);
    }
  }

  addFile(file: IElementPlusFile): void {
    if (!this.icon.id) {
      this.icon.id = uuidv4();
    }
    this.icon.originalName = file.name;
    this.icon.file = file.raw;
  }
}
