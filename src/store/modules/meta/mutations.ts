import { MutationTree } from 'vuex';

import Address from '@/classes/Address';
import SocialMedia from '@/classes/SocialMedia';

import { State } from './state';

const mutations: MutationTree<State> = {
  setCount(state, count: number) {
    state.count = count;
  },
  setSocialMedia(state, items: SocialMedia[]) {
    if (!items) {
      return;
    }
    state.socialMedia = items.map((i: SocialMedia) => new SocialMedia(i));
  },
  setAddresses(state, items?: Address[]) {
    if (!items) {
      return;
    }
    state.addresses = items.map((i: Address) => new Address(i));
  },
};

export default mutations;
