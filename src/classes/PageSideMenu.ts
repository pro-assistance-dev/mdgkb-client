import PageSection from '@/classes/PageSection';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class PageSideMenu {
  id?: string;
  name = '';
  order = 0;
  description = '';
  routeAnchor = '';
  @ClassHelper.GetClassConstructor(PageSection)
  pageSections: PageSection[] = [];
  pageSectionsForDelete: string[] = [];
  showContent = false;

  pageId?: string;

  selected = false;
  constructor(i?: PageSideMenu) {
    ClassHelper.BuildClass(this, i);
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
