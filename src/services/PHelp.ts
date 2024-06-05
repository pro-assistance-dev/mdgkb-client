import Notification from './Notification';
import Dialog from './Dialog';

import { ref } from 'vue'

export default abstract class PHelp {
  static dialog = ref(Dialog)
  static notification = ref(Notification)

  static Notification() {
    return PHelp.notification.value
  }
  static Dialog() {
    return PHelp.dialog.value
  }
}
