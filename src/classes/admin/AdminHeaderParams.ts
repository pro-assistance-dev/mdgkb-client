import IAdminButtonParams from '@/interfaces/admin/IAdminButtonParams';
import IAdminHeaderParams from '@/interfaces/admin/IAdminHeaderParams';

import AdminButtonParams from './AdminButtonParams';

export default class AdminHeaderParams implements IAdminHeaderParams {
  title = '';
  showBackButton = false;
  buttons: IAdminButtonParams[] = [];
  applicationsCount = 0;

  constructor(adminHeaderParams?: IAdminHeaderParams) {
    if (!adminHeaderParams) {
      return;
    }
    this.title = adminHeaderParams.title;
    if (adminHeaderParams.applicationsCount) {
      this.applicationsCount = adminHeaderParams.applicationsCount;
    }
    if (adminHeaderParams.showBackButton !== undefined) {
      this.showBackButton = adminHeaderParams.showBackButton;
    }
    if (adminHeaderParams.buttons) {
      this.buttons = adminHeaderParams.buttons.map((item: IAdminButtonParams) => new AdminButtonParams(item));
    }
  }
}
