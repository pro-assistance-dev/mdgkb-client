import IFileInfo from '@/interfaces/files/IFileInfo';
import IFiler from '@/interfaces/files/IFiler';
import ISubSubMenu from '@/interfaces/menu/ISubSubMenu';
import IPage from '@/interfaces/page/IPage';
import ICrud from '@/interfaces/shared/ICrud';

export default interface ISubMenu extends IFiler {
  id?: string;
  name: string;
  link: string;

  menuId?: string;

  page: IPage;
  pageId?: string;

  subSubMenus: ISubSubMenu[];
  subSubMenusForDelete: string[];

  withoutChildren: () => boolean;
  isPageLink: () => boolean;
  isLink: () => boolean;

  getLink: () => string;

  iconId?: string;
  icon: IFileInfo;

  crud: ICrud;
}
