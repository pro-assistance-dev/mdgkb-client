import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import getBaseActions from '@/services/store/baseModule/baseActions';
import { State } from './index';

const httpClient = new HttpClient('form-patterns');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
};

export default actions;
