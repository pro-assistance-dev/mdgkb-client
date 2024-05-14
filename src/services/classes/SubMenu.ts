import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/services/classes/FileInfo';
import Page from '@/services/classes/page/Page';
import ClassHelper from '@/services/ClassHelper';

export default class SubMenu {
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

  iconId?: string;
  icon = new FileInfo();
  iconName = '';
  svgCode = '';

  constructor(i?: SubMenu) {
    ClassHelper.BuildClass(this, i);
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
  addFile(file: any): void {
    if (!this.icon.id) {
      this.icon.id = uuidv4();
    }
    this.icon.originalName = file.name;
    this.icon.file = file.raw;
  }
}
