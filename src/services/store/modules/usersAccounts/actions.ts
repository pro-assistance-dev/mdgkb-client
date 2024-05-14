import { ActionTree } from 'vuex';

import UserAccount from '@/services/classes/UserAccount';
import HttpClient from '@/services/HttpClient';
import RootState from '@/services/interfaces/types';
import getBaseActions from '@/services/store/baseModule/baseActions';

import { State } from './index';

const httpClient = new HttpClient('users-accounts');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<UserAccount, State>(httpClient),
};

export default actions;
