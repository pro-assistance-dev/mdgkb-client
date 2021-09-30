import IPage from '@/interfaces/page/IPage';

export default interface ISubSubMenu {
  id?: string;
  name: string;
  link: string;

  subMenuId?: string;

  page: IPage;
  pageId?: string;
}
