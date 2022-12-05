import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSection from '@/interfaces/IPageSection';
import IPageSideMenu from '@/interfaces/IPageSideMenu';
import IPageComment from '@/interfaces/page/IPageComment';
import IPageDocument from '@/interfaces/page/IPageDocument';
import IPageImage from '@/interfaces/page/IPageImage';

export default interface IPage {
  id?: string;
  title: string;
  content: string;
  slug: string;
  link: string;
  withComments: boolean;
  pageImages: IPageImage[];
  pageImagesNames: string[];
  pageImagesForDelete: string[];

  pageSideMenus: IPageSideMenu[];
  pageSideMenusForDelete: string[];

  pageSections: IPageSection[];
  pageSectionsForDelete: string[];

  pageDocuments: IPageDocument[];
  pageComments: IPageComment[];

  getLink: () => string;
  getFileInfos: () => IFileInfo[];

  addSideMenu: () => void;
}
