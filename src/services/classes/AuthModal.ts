import AuthStatuses from '@/services/interfaces/AuthStatuses';

class AuthModal {
  private visible = false;
  private closable = false;
  private status: AuthStatuses = AuthStatuses.Login;

  Status(): AuthStatuses {
    return this.status;
  }

  IsClosable(): boolean {
    return this.closable;
  }

  IsVisible(): boolean {
    return this.visible;
  }

  Close(): void {
    this.visible = false;
  }

  Open(closable?: boolean): void {
    if (closable) {
      this.closable = true;
    }
    this.visible = true;
  }
}

export default new AuthModal();
