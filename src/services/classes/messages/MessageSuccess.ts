import IMessage from '@/services/interfaces/IMessage';

export default class MessageSuccess implements IMessage {
  dangerouslyUseHTMLString: boolean;
  message: string;
  type: 'info' | 'error' | 'success' | 'warning' | undefined;

  constructor() {
    this.dangerouslyUseHTMLString = false;
    this.message = 'Изменения успешно сохранены';
    this.type = 'success';
  }
}
