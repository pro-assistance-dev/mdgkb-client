import { ComputedRef } from 'vue';

import Button from './Button';

type f = () => string;
type Title = string | f | ComputedRef;
class AdminHeadC {
  title: Title = '';
  // showBackButton? = false;
  buttons: Button[] = [];
  // count? = 0;

  Set(title: Title = '', buttons: Button[]): void {
    if (typeof title === 'function') {
      this.title = title();
    } else if (typeof title === 'string') {
      this.title = title;
    } else {
      this.title = title.value;
    }

    // if (adminHeaderParams.applicationsCount) {
    //   this.applicationsCount = adminHeaderParams.applicationsCount;
    // }
    // if (adminHeaderParams.showBackButton !== undefined) {
    //   this.showBackButton = adminHeaderParams.showBackButton;
    // }
    this.buttons = buttons;
  }
}

export default new AdminHeadC();
