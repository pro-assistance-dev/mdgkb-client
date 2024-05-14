import { ref } from 'vue';

import AuthStatuses from '@/services/interfaces/AuthStatuses';
type MyCallbackWithOptParam = (error?: Error) => void;

export default class EmailPasswordForm {
  password = '';
  private passwordRef = ref();

  rule(_: unknown, value: string, callback: MyCallbackWithOptParam) {
    if (!value) {
      callback(new Error('Необходимо ввести пароль'));
    } else if (value.length < 6) {
      callback(new Error('Пароль должен быть не менее 6 символов'));
    }
    callback();
    return;
  }

  reset(): void {
    this.password = '';
  }

  show(status: AuthStatuses): boolean {
    return [AuthStatuses.Login, AuthStatuses.Register, AuthStatuses.Refresh].includes(status);
  }

  getErrors(): string[] {
    const errors: string[] = [];
    if (this.password === '') {
      errors.push('Введите пароль');
    }
    return errors;
  }

  focus(): void {
    (this.passwordRef as any).value.focus();
  }
}
