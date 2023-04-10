import { v4 as uuidv4 } from 'uuid';

import User from '@/classes/User';
import ClassHelper from '@/services/ClassHelper';
export enum ChateMessageTypes {
  Ping = 'ping',
  Enter = 'enter',
  Exit = 'exit',
  Message = 'message',
  Write = 'write',
  Empty = '',
}

export default class ChatMessage {
  id?: string;
  message = '';
  user: User = new User();
  userId?: string;
  userName?: string;
  createdOn = new Date();
  chatId?: string;
  type: ChateMessageTypes = ChateMessageTypes.Message;

  constructor(i?: ChatMessage) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(chatId: string, userId: string | undefined, messageText: string, userName: string | undefined): ChatMessage {
    const item = new ChatMessage();
    item.id = uuidv4();
    item.chatId = chatId;
    item.userId = userId;
    item.message = messageText;
    item.userName = userName;
    return item;
  }

  static CreatePingMessage(): ChatMessage {
    const item = new ChatMessage();
    item.type = ChateMessageTypes.Ping;
    item.id = uuidv4();
    return item;
  }

  isMessage(): boolean {
    return this.type === ChateMessageTypes.Message || this.type === ChateMessageTypes.Empty;
  }
}
