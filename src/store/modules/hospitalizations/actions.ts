import { ActionTree } from 'vuex';

import HospitalizationType from '@/classes/HospitalizationType';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('hospitalizations');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  pdf: async (_, id: string): Promise<void> => {
    await httpClient.get<HospitalizationType>({
      query: `pdf/${id}`,
      isBlob: true,
    });
  },
};

export default actions;
