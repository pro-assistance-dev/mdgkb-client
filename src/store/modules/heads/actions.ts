import { ActionTree } from 'vuex';

import Head from '@/classes/Head';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('heads');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Head, State>('heads'),
};

export default actions;
