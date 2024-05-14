import { ActionTree } from 'vuex';

import Contact from '@/services/classes/Contact';
import HttpClient from '@/services/HttpClient';
import RootState from '@/services/interfaces/types';
import getBaseActions from '@/services/store/baseModule/baseActions';

import { State } from './index';

const httpClient = new HttpClient('contacts');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Contact, State>(httpClient),
};

export default actions;
