import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSectionImage from '@/interfaces/IPageSectionImage';
import IPageSideMenu from '@/interfaces/IPageSideMenu';
import IPage from '@/interfaces/page/IPage';

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

  pageSideMenu: IPageSideMenu;
  pageSideMenuId?: string;
  page: IPage;
  pageId?: string;
  // findDocument: (documents: IPageSectionDocument[]) => IPageSectionDocument;
}
