import AdminUI from './AdminUI';
import Dialog from './Dialog';
import Loading from './Loading';
import Notification from './Notification';
import Paginator from './Paginator';

export default abstract class PHelp {
  static Dialog = reactive(Dialog);
  static Notification = reactive(Notification);
  static Loading = reactive(Loading);
  static AdminUI = reactive(AdminUI);
  static Paginator = reactive(Paginator);
}
