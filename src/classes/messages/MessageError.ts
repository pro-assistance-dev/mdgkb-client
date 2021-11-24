import IMessage from '@/interfaces/shared/IMessage';

export default class MessageError implements IMessage {
  dangerouslyUseHTMLString: boolean;
  message: string;
  type: 'error';

  constructor(errorFields: any) {
    this.dangerouslyUseHTMLString = true;
    this.message = MessageError.FormMessage(errorFields);
    this.type = 'error';
  }

  static FormMessage(errorFields: any): string {
    let errorMessage = '<strong>Проверьте правильность введенных данных:</strong><ul>';
    for (const item of Object.keys(errorFields)) {
      if (errorFields[item][0] && errorFields[item][0].message) {
        errorMessage += `<li>${errorFields[item][0].message}</li>`;
      }
    }
    errorMessage += '</ul>';
    return errorMessage;
  }
}
