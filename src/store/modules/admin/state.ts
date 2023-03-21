import { ILoadingInstance } from 'element-plus';

import IAdminMenu from '@/interfaces/IAdminMenu';
import IApplicationsCount from '@/interfaces/IApplicationsCount';
import ISearchQuery from '@/interfaces/ISearchQuery';
import AdminHeaderParams from '@/services/classes/admin/AdminHeaderParams';

export interface State {
  headerParams: AdminHeaderParams;
  isCollapseSideMenu: boolean;
  showHeader: boolean;
  isDrawerOpen: boolean;
  loading: ILoadingInstance | undefined;
  menus: IAdminMenu[];
  adminMenus: ISearchQuery[];
  applicationsCounts: IApplicationsCount[];
}
