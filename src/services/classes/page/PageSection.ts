import FileInfo from '@/services/classes/FileInfo';
import PageSectionDocument from '@/services/classes/page/PageSectionDocument';
import PageSectionImage from '@/services/classes/PageSectionImage';
import ClassHelper from '@/services/ClassHelper';

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

  constructor(i?: PageSection) {
    ClassHelper.BuildClass(this, i);
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
}
