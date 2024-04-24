import AuthStatuses from '@/services/interfaces/AuthStatuses';

export default class AuthButton {
  label = '';
  isSubmit = false;
  disabled = false;
  private readonly toStatus: AuthStatuses = AuthStatuses.Login;

  constructor(label: string, toStatus: AuthStatuses, isSubmit = false) {
    this.label = label;
    this.toStatus = toStatus;
    this.isSubmit = isSubmit;
  }

  static Login(isSubmit?: boolean): AuthButton {
    return new AuthButton('Войти', AuthStatuses.Login, isSubmit);
  }

  static Register(isSubmit?: boolean): AuthButton {
    return new AuthButton('Зарегистрироваться', AuthStatuses.Register, isSubmit);
  }

  static Restore(isSubmit?: boolean): AuthButton {
    return new AuthButton('Восстановить пароль', AuthStatuses.Restore, isSubmit);
  }

  static Refresh(isSubmit?: boolean): AuthButton {
    return new AuthButton('Обновить пароль', AuthStatuses.Refresh, isSubmit);
  }

  static LoginButtons(): AuthButton[] {
    return [AuthButton.Login(true), AuthButton.Register(), AuthButton.Restore()];
  }

  static RegisterButtons(): AuthButton[] {
    return [AuthButton.Register(true), AuthButton.Login(), AuthButton.Restore()];
  }

  static RestoreButtons(): AuthButton[] {
    return [AuthButton.Restore(true), AuthButton.Login(), AuthButton.Register()];
  }

  static RefreshButtons(): AuthButton[] {
    return [AuthButton.Refresh(true)];
  }

  getStatus(): AuthStatuses {
    return this.toStatus;
  }
  off(): void {
    this.disabled = false;
  }
  on(): void {
    this.disabled = true;
  }
}
