import { ActionTree } from 'vuex';

import Phone from '@/services/classes/Phone';
import HttpClient from '@/services/HttpClient';
import RootState from '@/services/interfaces/types';
import getBaseActions from '@/services/store/baseModule/baseActions';

import { State } from './index';

const httpClient = new HttpClient('phones');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Phone, State>(httpClient),
};

export default actions;
