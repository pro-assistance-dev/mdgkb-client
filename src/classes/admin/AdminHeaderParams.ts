import IAdminButtonParams from '@/interfaces/admin/IAdminButtonParams';

import AdminButtonParams from './AdminButtonParams';

export default class AdminHeaderParams {
  title = '';
  showBackButton? = false;
  buttons: IAdminButtonParams[] = [];
  applicationsCount? = 0;

  constructor(adminHeaderParams?: AdminHeaderParams) {
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
