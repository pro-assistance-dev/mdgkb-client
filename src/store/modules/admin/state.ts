import { ILoadingInstance } from 'element-plus';

import IAdminHeaderParams from '@/interfaces/admin/IAdminHeaderParams';

export interface State {
  headerParams: IAdminHeaderParams;
  isCollapseSideMenu: boolean;
  showHeader: boolean;
  isDrawerOpen: boolean;
  loading: ILoadingInstance | undefined;
}
