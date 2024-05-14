import { v4 as uuidv4 } from 'uuid';

// import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import FileInfo from '@/services/classes/FileInfo';
import Page from '@/services/classes/page/Page';
import SubMenu from '@/services/classes/SubMenu';
import ClassHelper from '@/services/ClassHelper';

export default class Menu {
  id?: string;
  name = '';
  link = '';
  top = true;
  side = true;
  show = false;
  hide = false;
  active = false;
  order = 0;
  selected = false;
  editMode = false;

  page = new Page();
  pageId?: string;

  @ClassHelper.GetClassConstructor(SubMenu)
  subMenus: SubMenu[] = [];
  subMenusForDelete: string[] = [];

  iconId?: string;
  icon = new FileInfo();

  constructor(i?: Menu) {
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

  withoutChildren(): boolean {
    return this.subMenus.length === 0;
  }

  isLink(): boolean {
    return this.link !== '';
  }

  isPageLink(): boolean {
    return !!this.pageId && this.pageId !== '';
  }

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    fileInfos.push(this.icon);
    this.subMenus.forEach((subMenu: SubMenu) => {
      fileInfos.push(subMenu.icon);
    });
    return fileInfos;
  }

  addFile(file: any): void {
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

  setColorsForSubMenus(): void {
    const colors: string[] = ['#00A248', '#E63021', '#006BB5', '#F3911F', '#6F6D6B'];
    let i = 0;
    this.subMenus.forEach((subMenu) => {
      subMenu.color = colors[i];
      i === colors.length - 1 ? (i = 0) : i++;
    });
  }
  containPath(path: string): boolean {
    return this.getLink() === path || !!this.subMenus.find((subMenu: SubMenu) => subMenu.getLink() === path);
  }
  static GetClassName(): string {
    return 'menu';
  }
}
