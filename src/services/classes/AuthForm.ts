import AuthButton from '@/services/classes/AuthButton';
import { AuthStatusesObjects } from '@/services/classes/AuthStatusesObjects';
import EmailField from '@/services/classes/EmailField';
import PasswordField from '@/services/classes/PasswordField';
import PasswordRepeatField from '@/services/classes/PasswordRepeatField';
import AuthStatuses from '@/services/interfaces/AuthStatuses';
import IEmailPassword from '@/services/interfaces/IEmailPassword';

class AuthForm {
  private status: AuthStatuses = AuthStatuses.Login;
  private email = new EmailField();
  private password = new PasswordField();
  private passwordRepeat = new PasswordRepeatField();

  Status(): AuthStatuses {
    return this.status;
  }

  Email(): EmailField {
    return this.email;
  }
  Password(): PasswordField {
    return this.password;
  }

  PasswordRepeat(): PasswordRepeatField {
    return this.passwordRepeat;
  }

  GetErrors(): string[] {
    if (this.IsRefresh()) {
      if (!this.ComparePasswords()) {
        return ['Пароли не совпадают, проверьте ввод!'];
      }
      return this.password.getErrors();
    }
    if (this.IsRestore()) {
      return this.email.getErrors();
    }

    if (this.IsRegister()) {
      if (!this.ComparePasswords()) {
        return ['Пароли не совпадают, проверьте ввод!'];
      }
      return this.email.getErrors();
    }

    return [...this.email.getErrors(), ...this.password.getErrors()];
  }

  ComparePasswords(): boolean {
    return this.password.password === this.passwordRepeat.text ? true : false;
  }

  ToEmailPassword(): IEmailPassword {
    return { email: this.email.email, password: this.password.password };
  }

  IsLogin(): boolean {
    return this.status === AuthStatuses.Login;
  }

  IsRegister(): boolean {
    return this.status === AuthStatuses.Register;
  }

  IsRestore(): boolean {
    return this.status === AuthStatuses.Restore;
  }

  IsRefresh(): boolean {
    return this.status === AuthStatuses.Refresh;
  }

  SetStatus(status: AuthStatuses): void {
    this.status = status;
  }

  GetTitle(): string {
    return AuthStatusesObjects[this.status].title as string;
  }

  GetComponent(): string {
    return AuthStatusesObjects[this.status].component as string;
  }

  GetAuthButtons(): AuthButton[] {
    return AuthStatusesObjects[this.status].buttons as AuthButton[];
  }

  GetSuccessMessage(): string {
    return AuthStatusesObjects[this.status].successMessage as string;
  }

  GetErrorMessage(): string {
    return AuthStatusesObjects[this.status].errorMessage as string;
  }

  GetAction(): string {
    return AuthStatusesObjects[this.status].action as string;
  }

  Reset(): void {
    this.email.reset();
    this.password.reset();
    this.status = AuthStatuses.Login;
  }

  Focus(): void {
    this.email.focus();
  }
}

export default new AuthForm();
