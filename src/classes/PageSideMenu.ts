import Page from '@/classes/page/Page';
import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSection from '@/interfaces/IPageSection';
import IPageSideMenu from '@/interfaces/IPageSideMenu';
import IPage from '@/interfaces/page/IPage';

export default class PageSideMenu implements IPageSideMenu {
  id?: string;
  name = '';
  order = 0;
  description = '';
  routeAnchor = '';

  pageSections: IPageSection[] = [];
  pageSectionsForDelete: string[] = [];

  page: IPage = new Page();
  pageId?: string;
  constructor(i?: IPageSideMenu) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.routeAnchor = i.routeAnchor;
    this.description = i.description;
    if (i.pageSections) {
      this.pageSections = i.pageSections.map((item: IPageSection) => new PageSection(item));
    }
    if (i.page) {
      this.page = new Page(i.page);
    }
    this.pageId = i.pageId;
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.pageSections.forEach((i: IPageSection) => {
      fileInfos.push(...i.getFileInfos());
    });
    return fileInfos;
  }

  addPageSection(): void {
    this.pageSections.push(new PageSection());
  }
}
