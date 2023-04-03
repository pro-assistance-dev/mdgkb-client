import ChatMessage from '@/services/classes/ChatMessage';
import ClassHelper from '@/services/ClassHelper';

export default class Chat {
  id?: string;
  @ClassHelper.GetClassConstructor(ChatMessage)
  chatMessages: ChatMessage[] = [];
  constructor(i?: Chat) {
    ClassHelper.BuildClass(this, i);
  }

  addChatMessages(message: ChatMessage): void {
    if (this.chatMessages.find((m: ChatMessage) => m.id === message.id)) {
      return;
    }
    this.chatMessages.push(message);
  }
}
