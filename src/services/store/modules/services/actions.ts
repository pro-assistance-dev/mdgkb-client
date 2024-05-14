import { ActionTree } from 'vuex';

import Schedule from '@/classes/Schedule';
import HttpClient from '@/services/HttpClient';
import RootState from '@/services/interfaces/types';
import getBaseActions from '@/services/services/store/baseModule/baseActions';

import { State } from './index';

const httpClient = new HttpClient('schedules');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Schedule, State>(httpClient),
};

export default actions;
