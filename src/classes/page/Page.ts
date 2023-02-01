import PageDocument from '@/classes/page/PageDocument';
import PageImage from '@/classes/page/PageImage';
import PageSection from '@/classes/PageSection';
import PageSideMenu from '@/classes/PageSideMenu';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ICustomSection from '@/interfaces/ICustomSection';
import IPageSection from '@/interfaces/IPageSection';
import IPageSideMenu from '@/interfaces/IPageSideMenu';
import IPage from '@/interfaces/page/IPage';
import IPageComment from '@/interfaces/page/IPageComment';
import IPageDocument from '@/interfaces/page/IPageDocument';
import IPageImage from '@/interfaces/page/IPageImage';

export default class Page implements IPage {
  id?: string;
  title = '';
  content = '';
  slug = '';
  link = '';
  withComments = false;
  pageImages: IPageImage[] = [];
  pageImagesForDelete: string[] = [];
  pageImagesNames: string[] = [];
  pageSideMenus: IPageSideMenu[] = [];
  pageSideMenusForDelete: string[] = [];

  pageSections: IPageSection[] = [];
  pageSectionsForDelete: string[] = [];

  pageDocuments: IPageDocument[] = [];
  pageComments: IPageComment[] = [];

  constructor(i?: IPage) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.title = i.title;
    this.content = i.content;
    this.slug = i.slug;
    this.link = i.link;
    this.withComments = i.withComments;

    if (i.pageDocuments) {
      this.pageDocuments = i.pageDocuments.map((i: IPageDocument) => new PageDocument(i));
    }
    if (i.pageDocuments) {
      this.pageDocuments = i.pageDocuments.map((i: IPageDocument) => new PageDocument(i));
    }
    if (i.pageImages) {
      this.pageImages = i.pageImages.map((i: IPageImage) => new PageImage(i));
    }

    if (i.pageSideMenus) {
      this.pageSideMenus = i.pageSideMenus.map((i: IPageSideMenu) => new PageSideMenu(i));
    }

    if (i.pageSections) {
      this.pageSections = i.pageSections.map((i: IPageSection) => new PageSection(i));
    }
  }

  getLink(): string {
    if (this.slug !== '') {
      return `/pages/${this.slug}`;
    }
    return '404';
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.pageSideMenus.forEach((item: IPageSideMenu) => {
      fileInfos.push(...item.getFileInfos());
    });
    this.pageDocuments.forEach((pageDocument: IPageDocument) => {
      if (pageDocument.document.scan) {
        fileInfos.push(pageDocument.document.scan);
      }
    });
    this.pageImages.forEach((pageImage: IPageImage) => {
      if (pageImage.fileInfo) {
        fileInfos.push(pageImage.fileInfo);
      }
    });
    return fileInfos;
  }

  addSideMenu(): void {
    const menu = new PageSideMenu();
    menu.order = this.pageSideMenus.length - 1;
    this.pageSideMenus.push(menu);
  }

  selectSideMenu(id: string): void {
    if (!id && this.pageSideMenus.length > 0) {
      this.pageSideMenus[0].selected = true;
      return;
    }
    this.pageSideMenus.forEach((m: IPageSideMenu) => (m.selected = m.id === id));
  }

  getSelectedSideMenu(): IPageSideMenu {
    const selectedMenu = this.pageSideMenus.find((m: IPageSideMenu) => m.selected);
    return selectedMenu ? selectedMenu : new PageSideMenu();
  }

  addCustomSectionsToSideMenu(customSections: ICustomSection[]): void {
    customSections.forEach((c: ICustomSection) => {
      const menu = new PageSideMenu();
      menu.id = c.id;
      menu.name = c.name;
      if (typeof c.order !== 'undefined') {
        this.pageSideMenus.splice(c.order, 0, menu);
      } else {
        this.pageSideMenus.push(menu);
      }
    });
  }
}
