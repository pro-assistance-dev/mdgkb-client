import IFileInfo from '@/interfaces/files/IFileInfo';
import IFiler from '@/interfaces/files/IFiler';
import ISubMenu from '@/interfaces/menu/ISubMenu';
import IPage from '@/interfaces/page/IPage';
import ICrud from '@/interfaces/shared/ICrud';

export default interface IMenu extends IFiler {
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

  iconId?: string;
  icon: IFileInfo;

  getLink: () => string;

  crud: ICrud;
  getFileInfos: () => IFileInfo[];
}
