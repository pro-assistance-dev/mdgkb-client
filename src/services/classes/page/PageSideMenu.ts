import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/services/classes/FileInfo';
import PageSection from '@/services/classes/page/PageSection';
import ClassHelper from '@/services/ClassHelper';
import Strings from '@/services/Strings'

export default class PageSideMenu {
  id?: string;
  name = 'Новое меню';
  order = 0;
  description = '';
  routeAnchor = '';
  slug = '';
  @ClassHelper.GetClassConstructor(PageSection)
  pageSections: PageSection[] = [];
  pageSectionsForDelete: string[] = [];
  showContent = false;

  pageId?: string;

  selected = false;

  sections: PageSection[] = []
  text = ''
  constructor(i?: PageSideMenu) {
    ClassHelper.BuildClass(this, i);

    this.sections = this.pageSections
    this.text = this.description.replace("<p>undefined</p>", "")
  }

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
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

  infoExists(filterStr: string): boolean {
    const nameEq = Strings.SearchIn(this.name, filterStr)
    const descriptionEq = Strings.SearchIn(this.description, filterStr)
    const sectionExists = this.getPageSections(filterStr).length > 0

    return nameEq || descriptionEq || sectionExists
  }

  getPageSections(filterStr: string): PageSection[] {
    if (!filterStr.length) {
      return this.pageSections
    }
    return this.pageSections.filter((p: PageSection) => p.infoExists(filterStr))
  }

  filter(filterStr: string) {
    if (!filterStr.length) {
      this.sections = this.pageSections
      this.text = this.description
    } else {
      this.sections = this.pageSections.filter((p: PageSection) => p.infoExists(filterStr))
      this.text = Strings.SearchIn(this.description, filterStr) ? Strings.WrapSubStr(this.description, filterStr) : ''
    }
    this.sections.forEach((p: PageSection) => p.filter(filterStr))
  }
}
