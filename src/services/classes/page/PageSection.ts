import IFileInfo from '@/interfaces/files/IFileInfo';
import PageSectionDocument from '@/services/classes/page/PageSectionDocument';
import PageSectionImage from '@/services/classes/PageSectionImage';
import ClassHelper from '@/services/ClassHelper';

export default class PageSection {
  id?: string;
  name = '';
  singleScan = false;
  scan?: IFileInfo;
  scanId?: string;
  order = 0;
  description = '';
  scans: IFileInfo[] = [];
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
    this.pageSectionDocuments.push(new PageSectionDocument());
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.pageSectionDocuments.forEach((i: PageSectionDocument) => {
      fileInfos.push(...i.getFileInfos());
    });
    return fileInfos;
  }
}
