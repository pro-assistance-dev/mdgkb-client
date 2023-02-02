import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/classes/File/FileInfo';
import PageSectionDocument from '@/classes/PageSectionDocument';
import WithDocumentType from '@/classes/WithDocumentType';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
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

  pageSectionDocuments: PageSectionDocument[] = [];
  pageSectionDocumentsForDelete: string[] = [];

  pageSectionImages: WithDocumentType[] = [];
  pageSectionImagesForDelete: string[] = [];

  // pageSideMenu: IPageSideMenu = new PageSideMenu();
  pageSideMenuId?: string;
  // page?: Page;
  pageId?: string;

  constructor(i?: PageSection) {
    ClassHelper.BuildClass(this, i);
  }

  addFile(file: IElementPlusFile): void {
    if (!this.scan) {
      this.scan = new FileInfo();
    }
    if (!this.scan.id) {
      this.scan.id = uuidv4();
    }
    this.scan.originalName = file.name;
    this.scan.file = file.raw;
  }
  addDocument(): void {
    this.pageSectionDocuments.push(new PageSectionDocument());
  }
  removeDocument(index: number): void {
    const idForDelete = this.pageSectionDocuments[index].id;
    if (idForDelete) {
      this.pageSectionDocumentsForDelete.push(idForDelete);
    }
    this.pageSectionDocuments.splice(index, 1);
  }
  // findDocument();

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.pageSectionDocuments.forEach((i: PageSectionDocument) => {
      fileInfos.push(...i.getFileInfos());
    });
    // this.pageSectionImages.forEach((i: PageSectionImage) => {
    //   fileInfos.push(i.fileInfo);
    // });
    return fileInfos;
  }
  // addDocumentTypeImage(): void {
  //   this.pageSectionImages.push(new DocumentTypeImage());
  // }
}
