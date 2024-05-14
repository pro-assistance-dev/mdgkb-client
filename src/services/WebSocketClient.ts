import * as path from 'path';
import { Commit } from 'vuex';

import ChatMessage from '@/services/classes/ChatMessage';
import ClassHelper from '@/services/ClassHelper';

const apiHost = import.meta.env.VITE_APP_API_HOST ?? '';
export default class WebSocketClient {
  private client?: WebSocket;
  private endpoint = '';
  private query = '';
  private mutation = '';
  private period = 20000;

  constructor(endpoint = '', query = '', mutation = 'set') {
    ClassHelper.BuildClass(this, { endpoint, query, mutation });
    this.connect();
    this.ping();
  }

  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (!this.client || this.client.readyState !== 1) {
      return;
    }
    this.client.send(data);
  }

  private ping() {
    setInterval(this.sendPing.bind(this), this.period);
  }

  private sendPing() {
    if (!this.client || this.client.readyState !== 1) {
      return;
    }
    this.send(JSON.stringify(ChatMessage.CreatePingMessage()));
  }

  setOnMessage(commit: Commit): void {
    if (!this.client) {
      return;
    }
    this.client.onmessage = (e: MessageEvent<any>) => {
      if (!e.data) {
        return;
      }
      commit(this.mutation, JSON.parse(e.data));
    };
  }

  private buildUrl(): string {
    const path = `ws/${this.endpoint}/${this.query}`;
    return new URL(path, apiHost.replace('http', 'ws')).toString();
  }

  private connect() {
    this.client = new WebSocket(this.buildUrl());
    this.client.onclose = this.reconnect;
    this.client.onerror = this.reconnect;
  }

  private reconnect() {
    setTimeout(this.connect, 3000);
  }
}
