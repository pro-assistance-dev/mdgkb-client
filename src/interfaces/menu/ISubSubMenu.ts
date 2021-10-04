import IFileInfo from '@/interfaces/files/IFileInfo';
import IFiler from '@/interfaces/files/IFiler';
import IPage from '@/interfaces/page/IPage';

export default interface ISubSubMenu extends IFiler {
  id?: string;
  name: string;
  link: string;

  subMenuId?: string;

  iconId?: string;
  icon: IFileInfo;

  page: IPage;
  pageId?: string;
}
