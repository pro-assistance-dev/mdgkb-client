import { ElMessage, MessageHandle } from 'element-plus';

import IMessage from '@/services/interfaces/IMessage';

interface IWithMessage {
  message: string;
}

export default class MessageError implements IMessage {
  dangerouslyUseHTMLString: boolean;
  message: string;
  type: 'error';

  constructor(errorFields: Record<string, unknown>) {
    this.dangerouslyUseHTMLString = true;
    this.message = MessageError.FormMessage(errorFields);
    this.type = 'error';
  }

  static FormMessage(errorFields: Record<string, unknown>): string {
    let errorMessage = '<strong>Проверьте правильность введенных данных:</strong><ul>';
    for (const item of Object.keys(errorFields)) {
      const err = (errorFields[item] as Array<unknown>)[0] as IWithMessage;
      if (err && err) {
        errorMessage += `<li>${err.message}</li>`;
      }
    }
    errorMessage += '</ul>';
    return errorMessage;
  }

  static Show(message: string): MessageHandle {
    return ElMessage({ message: message, type: 'error' });
  }
}
