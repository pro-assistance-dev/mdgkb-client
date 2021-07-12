import Vuex, { StoreOptions } from 'vuex'

import RootState from './types';
import {news} from '@/store/modules/news';
import {likes} from '@/store/modules/likes';

const store: StoreOptions<RootState> = {
  state: {
    layout: 'main-layout',
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    news,
    likes,
  }
}

export default new Vuex.Store<RootState>(store);
