import { GetterTree } from 'vuex';

import IBanner from '@/interfaces/banners/IBanner';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  banners(state): IBanner[] | undefined {
    const { banners } = state;
    return banners;
  },
  banner(state): IBanner | undefined {
    const { banner } = state;
    return banner;
  },
};

export default getters;
