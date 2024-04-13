import { ref } from 'vue';

import AuthStatuses from '@/services/interfaces/AuthStatuses';
type MyCallbackWithOptParam = (error?: Error) => void;

export default class EmailPasswordForm {
  text = '';
  private passwordRepeatRef = ref();

  rule(_: unknown, value: string, callback: MyCallbackWithOptParam) {
    if (!value) {
      callback(new Error('Необходимо повторить пароль'));
    }
    callback();
    return;
  }

  reset(): void {
    this.text = '';
  }

  show(status: AuthStatuses): boolean {
    return [AuthStatuses.Register, AuthStatuses.Refresh].includes(status);
  }

  getErrors(): string[] {
    const errors: string[] = [];
    if (this.text === '') {
      errors.push('Повторите пароль');
    }
    return errors;
  }

  focus(): void {
    (this.passwordRepeatRef as any).value.focus();
  }
}
