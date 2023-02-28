import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('medical-profiles');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions('medical-profiles'),
};

export default actions;
