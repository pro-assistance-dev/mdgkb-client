import { ActionTree } from 'vuex';

import FTSPPreset from '@/services/classes/FTSPPreset';
import HttpClient from '@/services/HttpClient';
import RootState from '@/services/interfaces/types';
import getBaseActions from '@/services/store/baseModule/baseActions';

import { State } from './index';

const httpClient = new HttpClient('ftsp-presets');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<FTSPPreset, State>(httpClient),
};

export default actions;
