import { MutationTree } from 'vuex';

import SupportMessage from '@/classes/SupportMessage';
import User from '@/classes/User';
import ISupportMessagesWithCount from '@/interfaces/ISupportMessagesWithCount';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, item: ISupportMessagesWithCount) {
    if (!item.supportMessages) {
      state.items = [];
      return;
    }
    state.items = item.supportMessages.map((i: SupportMessage) => new SupportMessage(i));
    state.count = item.count;
  },
  appendToAll(state, item: ISupportMessagesWithCount) {
    if (!item.supportMessages) {
      state.items = [];
      return;
    }
    const questions = item.supportMessages.map((i: SupportMessage) => new SupportMessage(i));
    state.items.push(...questions);
    state.count = item.count;
  },
  set(state, question?: SupportMessage) {
    state.item = new SupportMessage(question);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: SupportMessage) => i.id === id);
    state.items.splice(index, 1);
  },
  resetSupportMessage(state) {
    state.question = new SupportMessage();
  },
  setUser(state, user: User) {
    state.question.user = new User(user);
  },
  unshiftToAll(state, item: SupportMessage) {
    state.items.unshift(new SupportMessage(item));
  },
};

export default mutations;
