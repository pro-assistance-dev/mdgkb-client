import IFilesList from '@/interfaces/files/IFIlesList';
import IPage from '@/interfaces/page/IPage';

export interface State {
  pages: IPage[];
  page: IPage;
  curGalleryCropIndex: number;
  galleryList: IFilesList[];
  isSideMenuDialogActive: boolean;
  isPageSectionDialogActive: boolean;
  index: number;
  pageSectionIndex: number;
}
