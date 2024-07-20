import BaseStore from '@/services/BaseStore';
import Chat from '@/services/classes/Chat';
import ChatMessage from '@/services/classes/ChatMessage';
import WebSocketClient from '@/services/WebSocketClient';

class S extends BaseStore<Chat> {
  private client = new WebSocketClient();
  constructor() {
    super(Chat, 'chats');
  }

  Client(): WebSocketClient {
    return this.client;
  }

  setClient(client: WebSocketClient) {
    this.client = client;
  }
  addToChatMessages(message: ChatMessage) {
    this.item.addChatMessages(new ChatMessage(message));
  }

  async Connect(): Promise<void> {
    // const client = new WebSocketClient('chats', `connect/${chatId}/${userId}`, 'addToChatMessages');
    // client.setOnMessage(this.addToChatMessages);
    // this.setClient(client)
  }
}

const store: S = new S();
export default store;
