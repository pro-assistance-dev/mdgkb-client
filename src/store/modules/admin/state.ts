import { ILoadingInstance } from 'element-plus';

import IAdminMenu from '@/interfaces/IAdminMenu';
import IApplicationsCount from '@/interfaces/IApplicationsCount';
import AdminHeaderParams from '@/services/classes/admin/AdminHeaderParams';
import ISearchQuery from '@/services/interfaces/ISearchQuery';

export interface State {
  searchMenus: ISearchQuery[];
  applicationsCounts: IApplicationsCount[];
}
