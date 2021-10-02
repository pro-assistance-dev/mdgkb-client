import ISubSubMenu from '@/interfaces/menu/ISubSubMenu';
import IPage from '@/interfaces/page/IPage';
import ICrud from '@/interfaces/shared/ICrud';

export default interface ISubMenu {
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

  crud: ICrud;
}
