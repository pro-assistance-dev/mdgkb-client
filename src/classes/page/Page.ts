import PageDocument from '@/classes/page/PageDocument';
import PageImage from '@/classes/page/PageImage';
import PageSection from '@/classes/PageSection';
import PageSideMenu from '@/classes/PageSideMenu';
import IFileInfo from '@/interfaces/files/IFileInfo';
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
    this.pageSideMenus.push(new PageSideMenu());
  }
}
