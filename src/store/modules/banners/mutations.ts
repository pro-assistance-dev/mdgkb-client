import { MutationTree } from 'vuex';

import Banner from '@/classes/banners/Banner';
import IBanner from '@/interfaces/banners/IBanner';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, banners: IBanner[]) {
    state.banners = banners?.map((a: IBanner) => new Banner(a));
  },
  set(state, banner: IBanner) {
    state.banner = new Banner(banner);
  },
  remove(state, id: string) {
    const index = state.banners.findIndex((i: IBanner) => i.id === id);
    state.banners.splice(index, 1);
  },
};

export default mutations;
