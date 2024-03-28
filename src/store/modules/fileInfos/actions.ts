import { ActionTree } from 'vuex';

import FileInfo from '@/classes/FileInfo';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('file-infos');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<FileInfo, State>(httpClient),
};

export default actions;
