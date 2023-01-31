import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/classes/File/FileInfo';
import PageSection from '@/classes/PageSection';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSection from '@/interfaces/IPageSection';
import IPageSectionDocument from '@/interfaces/IPageSectionDocument';

export default class PageSectionDocument implements IPageSectionDocument {
  id?: string;
  name = '';
  order = 0;
  downloadToFile = false;
  pageSectionId?: string;
  pageSection: IPageSection = new PageSection();

  scan: IFileInfo = new FileInfo();
  scanId?: string;

  constructor(i?: IPageSectionDocument) {
    if (!i) {
      return;
    }
    this.id = i?.id;
    this.name = i.name;
    this.order = i.order;
    this.downloadToFile = i.downloadToFile;
    this.pageSectionId = i.pageSectionId;
    if (i.pageSection) {
      this.pageSection = new PageSection(i.pageSection);
    }
    if (i.scan) {
      this.scan = new FileInfo(i.scan);
    }
    this.scanId = i.scanId;
  }

  getFileInfos(): IFileInfo[] {
    return [this.scan];
  }

  uploadScan(file: IFile): IFileInfo {
    if (!this.scan.id) {
      uuidv4();
    }
    this.scan.originalName = file.name;
    this.scan.file = file.raw;
    this.scan.fileSystemPath = uuidv4();
    this.scan.url = file.url;
    return this.scan;
  }
}
