import { v4 as uuidv4 } from 'uuid';

import IFileInfo from '@/interfaces/files/IFileInfo';
import PageSection from '@/services/classes/page/PageSection';
import ClassHelper from '@/services/ClassHelper';

export default class PageSideMenu {
  id?: string;
  name = 'Новое меню';
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
    const section = new PageSection();
    section.order = this.pageSections.length + 1;
    section.name = `Новой раздел ${section.order}`;
    section.id = uuidv4();
    this.pageSections.push(section);
  }
}
