import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('candidate-exams');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions('candidate-exams'),
};

export default actions;
