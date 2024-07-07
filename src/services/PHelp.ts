import { ref } from 'vue';

import AdminHead from './AdminHead';
import AdminUI from './AdminUI';
import Dialog from './Dialog';
import Loading from './Loading';
import Notification from './Notification';

export default abstract class PHelp {
  static Dialog = reactive(Dialog);
  static Notification = reactive(Notification);
  static loading = ref(Loading);
  static adminHead = ref(AdminHead);
  static AdminUI = reactive(AdminUI);

  static Loading() {
    return PHelp.loading.value;
  }
  static AdminHead() {
    return PHelp.adminHead.value;
  }
}
