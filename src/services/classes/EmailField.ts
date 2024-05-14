import { ref } from 'vue';

import AuthStatuses from '@/services/interfaces/AuthStatuses';
type MyCallbackWithOptParam = (error?: Error) => void;

export default class EmailField {
  email = '';
  private emailRef = ref();

  rule(_: unknown, value: string, callback: MyCallbackWithOptParam) {
    if (!value.trim().length) {
      callback(new Error('Необходимо указать email'));
      return;
    }
    callback();
    return;
  }

  reset(): void {
    this.email = '';
  }

  show(status: AuthStatuses): boolean {
    return [AuthStatuses.Login, AuthStatuses.Register, AuthStatuses.Restore].includes(status);
  }

  getErrors(): string[] {
    const errors: string[] = [];
    if (this.email === '') {
      errors.push('Заполните email');
      return errors;
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(this.email)) {
      errors.push('Некорректный email');
      return errors;
    }
    return errors;
  }

  focus(): void {
    (this.emailRef as any).value.focus();
  }
}
