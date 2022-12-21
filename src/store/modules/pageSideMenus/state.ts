import IFileInfo from '@/interfaces/files/IFileInfo';
import IPageSideMenu from '@/interfaces/IPageSideMenu';

export interface State {
  items: IPageSideMenu[];
  item: IPageSideMenu;
  fileInfos: IFileInfo[];
}
