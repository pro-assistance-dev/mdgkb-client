import { v4 as uuidv4 } from 'uuid';

import DocumentTypeImage from '@/classes/DocumentTypeImage';
import FileInfo from '@/classes/File/FileInfo';
import PageSectionDocument from '@/classes/PageSectionDocument';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSectionDocument from '@/interfaces/IPageSectionDocument';
import IPageSectionImage from '@/interfaces/IPageSectionImage';

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

  pageSectionDocuments: IPageSectionDocument[] = [];
  pageSectionDocumentsForDelete: string[] = [];

  pageSectionImages: IPageSectionImage[] = [];
  pageSectionImagesForDelete: string[] = [];

  // pageSideMenu: IPageSideMenu = new PageSideMenu();
  pageSideMenuId?: string;
  // page?: Page;
  pageId?: string;

  constructor(i?: PageSection) {
    if (!i) {
      return;
    }
    this.id = i?.id;
    this.name = i?.name ?? '';
    this.singleScan = i.singleScan;
    this.order = i.order;
    this.description = i.description;
    if (i.scan) {
      this.scan = new FileInfo(i.scan);
    }
    this.scanId = i.scanId;
    // if (i.pageSideMenu) {
    //   this.pageSideMenu = new PageSideMenu(i.pageSideMenu);
    // }
    this.pageSideMenuId = i.pageSideMenuId;
    // if (i.page) {
    //   this.page = new Page(i.page);
    // }
    this.pageId = i.pageId;
    if (i.pageSectionDocuments) {
      this.pageSectionDocuments = i.pageSectionDocuments.map((item: IPageSectionDocument) => new PageSectionDocument(item));
    }
    if (i.pageSectionImages) {
      this.pageSectionImages = i.pageSectionImages.map((item: IPageSectionImage) => new DocumentTypeImage(item));
    }

    if (i.scans) {
      this.scans = i.scans.map((item: IFileInfo) => new FileInfo(item));
    }
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
    this.pageSectionDocuments.forEach((i: IPageSectionDocument) => {
      fileInfos.push(...i.getFileInfos());
    });
    this.pageSectionImages.forEach((i: IPageSectionImage) => {
      fileInfos.push(i.fileInfo);
    });
    return fileInfos;
  }
  addDocumentTypeImage(): void {
    this.pageSectionImages.push(new DocumentTypeImage());
  }
}
