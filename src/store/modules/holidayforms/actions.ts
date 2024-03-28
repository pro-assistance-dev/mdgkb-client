import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('holiday-forms');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
};

export default actions;
