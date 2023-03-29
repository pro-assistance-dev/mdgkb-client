import * as path from 'path';
import { Commit } from 'vuex';

import ClassHelper from '@/services/ClassHelper';

const apiHost = process.env.VUE_APP_API_HOST ?? '';
export default class WebSocketClient {
  private client?: WebSocket;
  private endpoint = '';
  private query = '';
  private mutation = '';
  private period = 1000;

  constructor(endpoint = '', query = '', mutation = 'set') {
    ClassHelper.BuildClass(this, { endpoint, query, mutation });
    this.connect();
    this.ping();
  }

  private ping() {
    setInterval(this.sendPing.bind(this), this.period);
  }

  private sendPing() {
    if (!this.client || this.client.readyState !== 1) {
      return;
    }
    this.client.send('ping');
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
    console.log(apiHost);
    return new URL(path.join('ws', this.endpoint, this.query), apiHost.replace('http', 'ws')).toString();
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
