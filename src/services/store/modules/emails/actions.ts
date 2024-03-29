import { ActionTree } from 'vuex';

import Email from '@/services/classes/Email';
import HttpClient from '@/services/HttpClient';
import RootState from '@/services/interfaces/types';
import getBaseActions from '@/services/store/baseModule/baseActions';

import { State } from './index';

const httpClient = new HttpClient('emails');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Email, State>(httpClient),
};

export default actions;
