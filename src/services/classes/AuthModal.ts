import AuthStatuses from '@/services/interfaces/AuthStatuses';

export default class AuthModal {
  visible = false;
  status: AuthStatuses = AuthStatuses.Login;

  close(): void {
    this.visible = false;
  }

  open(): void {
    this.visible = true;
  }
}
