import FileInfo from '@/services/classes/FileInfo';
import PageSectionDocument from '@/services/classes/page/PageSectionDocument';
import PageSectionImage from '@/services/classes/PageSectionImage';
import ClassHelper from '@/services/ClassHelper';
import Strings from '@/services/Strings'

export default class PageSection {
  id?: string;
  name = '';
  singleScan = false;
  scan?: FileInfo;
  scanId?: string;
  order = 0;
  description = '';
  scans: FileInfo[] = [];
  scansForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PageSectionDocument)
  pageSectionDocuments: PageSectionDocument[] = [];
  pageSectionDocumentsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PageSectionImage)
  pageSectionImages: PageSectionImage[] = [];
  pageSectionImagesForDelete: string[] = [];

  // pageSideMenu: IPageSideMenu = new PageSideMenu();
  pageSideMenuId?: string;
  pageId?: string;

  text = ''
  documents: PageSectionDocument[] = []

  constructor(i?: PageSection) {
    ClassHelper.BuildClass(this, i);

    this.documents = this.pageSectionDocuments
    this.text = this.description.replace("<p>undefined</p>", "")
  }

  addDocument(): void {
    const newDoc = new PageSectionDocument();
    newDoc.order = this.pageSectionDocuments.length - 1;
    this.pageSectionDocuments.push(newDoc);
  }

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    this.pageSectionDocuments.forEach((i: PageSectionDocument) => {
      fileInfos.push(...i.getFileInfos());
    });
    return fileInfos;
  }

  infoExists(filterStr: string): boolean {
    const nameEq = Strings.SearchIn(this.name, filterStr)
    const descriptionEq = Strings.SearchIn(this.description, filterStr)
    const docEq = this.getDocuments(filterStr)
    console.log(descriptionEq)
    return nameEq || descriptionEq || docEq.length > 0
  }

  getDocuments(filterStr: string): PageSectionDocument[] {
    return this.pageSectionDocuments.filter((p: PageSectionDocument) => Strings.SearchIn(p.name, filterStr))
  }

  getDescription(filterStr: string): string {
    if (!filterStr) {
      return this.description
    }
    const wrapped = Strings.WrapSubStr(this.description, filterStr)
    return wrapped
  }

  filter(filterStr: string) {
    if (!filterStr) {
      this.text = this.description
      this.documents = this.pageSectionDocuments
      return
    }

    this.text = Strings.SearchIn(this.description, filterStr) ? Strings.WrapSubStr(this.description, filterStr) : ''
    this.documents = this.pageSectionDocuments.filter((p: PageSectionDocument) => Strings.SearchIn(p.name, filterStr))
    // const wrapped = Strings.WrapSubStr(this.description, filterStr)
  }
}
