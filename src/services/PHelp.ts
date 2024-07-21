import AdminUI from './AdminUI';
import Auth from './classes/Auth';
import AuthForm from './classes/AuthForm';
import AuthModal from './classes/AuthModal';
import Dialog from './Dialog';
import Loading from './Loading';
import Notification from './Notification';
import Paginator from './Paginator';

export default abstract class PHelp {
  static Auth = reactive(Auth);
  static AuthForm = reactive(AuthForm);
  static AuthModal = reactive(AuthModal);

  static AdminUI = reactive(AdminUI);
  static Dialog = reactive(Dialog);
  static Notification = reactive(Notification);
  static Loading = reactive(Loading);
  static Paginator = reactive(Paginator);
}
