import { ComputedRef } from 'vue';

import AdminButtonParams from './AdminButtonParams';

type f = () => string;
export default class AdminHeaderParams {
  title: string | f | ComputedRef = '';
  showBackButton? = false;
  buttons: AdminButtonParams[] = [];
  applicationsCount? = 0;

  constructor(adminHeaderParams?: AdminHeaderParams) {
    if (!adminHeaderParams) {
      return;
    }
    if (typeof adminHeaderParams.title === 'function') {
      this.title = adminHeaderParams.title();
    } else if (typeof adminHeaderParams.title === 'string') {
      this.title = adminHeaderParams.title;
    } else {
      this.title = adminHeaderParams.title.value;
    }

    if (adminHeaderParams.applicationsCount) {
      this.applicationsCount = adminHeaderParams.applicationsCount;
    }
    if (adminHeaderParams.showBackButton !== undefined) {
      this.showBackButton = adminHeaderParams.showBackButton;
    }
    if (adminHeaderParams.buttons) {
      this.buttons = adminHeaderParams.buttons.map((item: AdminButtonParams) => new AdminButtonParams(item));
    }
  }
}
