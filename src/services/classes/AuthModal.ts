import AuthStatuses from '@/services/interfaces/AuthStatuses';

export default class AuthModal {
  visible = false;
  closable = false;
  status: AuthStatuses = AuthStatuses.Login;

  close(): void {
    this.visible = false;
  }

  open(closable?: boolean): void {
    if (closable) {
      this.closable = true;
    }
    this.visible = true;
  }
}
