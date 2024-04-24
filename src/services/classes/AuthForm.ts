import AuthButton from '@/services/classes/AuthButton';
import { AuthStatusesObjects } from '@/services/classes/AuthStatusesObjects';
import EmailField from '@/services/classes/EmailField';
import PasswordField from '@/services/classes/PasswordField';
import PasswordRepeatField from '@/services/classes/PasswordRepeatField';
import AuthStatuses from '@/services/interfaces/AuthStatuses';
import IEmailPassword from '@/services/interfaces/IEmailPassword';

export default class AuthForm {
  status: AuthStatuses = AuthStatuses.Login;
  email = new EmailField();
  password = new PasswordField();
  passwordRepeat = new PasswordRepeatField();

  getErrors(): string[] {
    if (this.isRefresh()) {
      if (!this.comparePasswords()) {
        return ['Пароли не совпадают, проверьте ввод!'];
      }
      return this.password.getErrors();
    }
    if (this.isRestore()) {
      return this.email.getErrors();
    }

    if (this.isRegister()) {
      if (!this.comparePasswords()) {
        return ['Пароли не совпадают, проверьте ввод!'];
      }
      return this.email.getErrors();
    }

    return [...this.email.getErrors(), ...this.password.getErrors()];
  }

  comparePasswords(): boolean {
    return this.password.password === this.passwordRepeat.text ? true : false;
  }

  toEmailPassword(): IEmailPassword {
    return { email: this.email.email, password: this.password.password };
  }

  isLogin(): boolean {
    return this.status === AuthStatuses.Login;
  }

  isRegister(): boolean {
    return this.status === AuthStatuses.Register;
  }

  isRestore(): boolean {
    return this.status === AuthStatuses.Restore;
  }

  isRefresh(): boolean {
    return this.status === AuthStatuses.Refresh;
  }

  setStatus(status: AuthStatuses): void {
    this.status = status;
  }

  getTitle(): string {
    return AuthStatusesObjects[this.status].title as string;
  }

  getComponent(): string {
    return AuthStatusesObjects[this.status].component as string;
  }

  getAuthButtons(): AuthButton[] {
    return AuthStatusesObjects[this.status].buttons as AuthButton[];
  }

  getSuccessMessage(): string {
    return AuthStatusesObjects[this.status].successMessage as string;
  }

  getErrorMessage(): string {
    return AuthStatusesObjects[this.status].errorMessage as string;
  }

  getAction(): string {
    return AuthStatusesObjects[this.status].action as string;
  }

  reset(): void {
    this.email.reset();
    this.password.reset();
    this.status = AuthStatuses.Login;
  }

  focus(): void {
    this.email.focus();
  }
}
