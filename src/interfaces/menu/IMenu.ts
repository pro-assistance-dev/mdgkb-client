import ISubMenu from '@/interfaces/menu/ISubMenu';
import IPage from '@/interfaces/page/IPage';
import ICrud from '@/interfaces/shared/ICrud';

export default interface IMenu {
  id?: string;
  name: string;
  link: string;
  top: boolean;
  side: boolean;

  page: IPage;
  pageId?: string;

  subMenus: ISubMenu[];
  subMenusForDelete: string[];

  withoutChildren: () => boolean;
  isPageLink: () => boolean;
  isLink: () => boolean;

  getLink: () => string;

  crud: ICrud;
}
