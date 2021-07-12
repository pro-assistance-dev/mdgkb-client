import Vuex, { StoreOptions } from 'vuex'

import RootState from './types';
import {news} from '@/store/modules/news';
import {likes} from '@/store/modules/likes';
import {normativeDocuments} from '@/store/modules/normativeDocuments';

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
    normativeDocuments,
  }
}

export default new Vuex.Store<RootState>(store);
