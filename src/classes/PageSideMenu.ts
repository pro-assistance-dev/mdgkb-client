import Page from '@/classes/page/Page';
import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default class PageSideMenu {
  id?: string;
  name = '';
  order = 0;
  description = '';
  routeAnchor = '';

  pageSections: PageSection[] = [];
  pageSectionsForDelete: string[] = [];

  page: Page = new Page();
  pageId?: string;

  selected = false;
  constructor(i?: PageSideMenu) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;
    this.routeAnchor = i.routeAnchor;
    this.description = i.description;
    if (i.pageSections) {
      this.pageSections = i.pageSections.map((item: PageSection) => new PageSection(item));
    }
    if (i.page) {
      this.page = new Page(i.page);
    }
    this.pageId = i.pageId;
    this.selected = i.selected;
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.pageSections.forEach((i: PageSection) => {
      fileInfos.push(...i.getFileInfos());
    });
    return fileInfos;
  }

  addPageSection(): void {
    this.pageSections.push(new PageSection());
  }
}
