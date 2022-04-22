import { ILoadingInstance } from 'element-plus';

import IAdminHeaderParams from '@/interfaces/admin/IAdminHeaderParams';
import IAdminMenu from '@/interfaces/IAdminMenu';

export interface State {
  headerParams: IAdminHeaderParams;
  isCollapseSideMenu: boolean;
  showHeader: boolean;
  isDrawerOpen: boolean;
  loading: ILoadingInstance | undefined;
  menus: IAdminMenu[];
}
