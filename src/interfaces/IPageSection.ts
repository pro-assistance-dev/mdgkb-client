import Page from '@/classes/page/Page';
import PageSideMenu from '@/classes/PageSideMenu';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSectionImage from '@/interfaces/IPageSectionImage';

import IPageSectionDocument from './IPageSectionDocument';

export default interface IPageSection {
  id?: string;
  name: string;
  singleScan: boolean;
  description: string;
  scan?: IFileInfo;
  scanId?: string;
  order: number;
  scans: IFileInfo[];
  scansForDelete: string[];

  pageSectionDocuments: IPageSectionDocument[];
  pageSectionDocumentsForDelete: string[];

  addFile: (file: IElementPlusFile) => void;
  addDocument: () => void;
  removeDocument: (index: number) => void;

  pageSectionImages: IPageSectionImage[];
  pageSectionImagesForDelete: string[];
  addDocumentTypeImage: () => void;
  getFileInfos: () => IFileInfo[];

  pageSideMenu: PageSideMenu;
  pageSideMenuId?: string;
  page: Page;
  pageId?: string;
  // findDocument: (documents: IPageSectionDocument[]) => IPageSectionDocument;
}
