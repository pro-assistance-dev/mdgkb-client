import { ILoadingInstance } from 'element-plus';

import AdminHeaderParams from '@/classes/admin/AdminHeaderParams';
import IAdminMenu from '@/interfaces/IAdminMenu';
import ISearchQuery from '@/interfaces/ISearchQuery';

export interface State {
  headerParams: AdminHeaderParams;
  isCollapseSideMenu: boolean;
  showHeader: boolean;
  isDrawerOpen: boolean;
  loading: ILoadingInstance | undefined;
  menus: IAdminMenu[];
  adminMenus: ISearchQuery[];
}
