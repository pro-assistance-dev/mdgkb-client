import Notification from './Notification';
import Dialog from './Dialog';
import Loading from './Loading';
import AdminHead from './AdminHead';

import { ref } from 'vue';

export default abstract class PHelp {
  static dialog = ref(Dialog);
  static notification = ref(Notification);
  static loading = ref(Loading);
  static adminHead = ref(AdminHead);

  static Notification() {
    return PHelp.notification.value;
  }

  static Dialog() {
    return PHelp.dialog.value;
  }

  static Loading() {
    return PHelp.loading.value;
  }
  static AdminHead() {
    return PHelp.adminHead.value;
  }
}
