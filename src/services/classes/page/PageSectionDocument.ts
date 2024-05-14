import { v4 as uuidv4 } from 'uuid';

import FileInfo from '@/services/classes/FileInfo';
import IFile from '@/services/interfaces/IFile';

export default class PageSectionDocument {
  id?: string;
  name = '';
  order = 0;
  downloadToFile = false;
  pageSectionId?: string;
  // pageSection: IPageSection = new PageSection();

  scan: FileInfo = new FileInfo();
  scanId?: string;

  constructor(i?: PageSectionDocument) {
    if (!i) {
      return;
    }
    this.id = i?.id;
    this.name = i.name;
    this.order = i.order;
    this.downloadToFile = i.downloadToFile;
    this.pageSectionId = i.pageSectionId;
    // if (i.pageSection) {
    //   this.pageSection = new PageSection(i.pageSection);
    // }
    if (i.scan) {
      this.scan = new FileInfo(i.scan);
    }
    this.scanId = i.scanId;
  }

  getFileInfos(): FileInfo[] {
    return [this.scan];
  }

  uploadScan(file: IFile): FileInfo {
    if (!this.scan.id) {
      this.scan.id = uuidv4();
    }
    this.scan.originalName = file.name;
    this.scan.file = file.raw;
    this.scan.fileSystemPath = uuidv4();
    this.scan.url = file.url;
    return this.scan;
  }

  getFileName(): string {
    if (this.name) {
      return this.name;
    }
    return this.scan.originalName;
  }
}
