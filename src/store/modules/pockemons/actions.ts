import { ActionTree } from 'vuex';

import RootState from '@/store/types';

import State from './state';

const actions: ActionTree<State, RootState> = {
  getRandom: async ({ commit }): Promise<void> => {
    commit('set', await (await fetch('https://app.pokemon-api.xyz/pokemon/random')).json());
  },
};

export default actions;
