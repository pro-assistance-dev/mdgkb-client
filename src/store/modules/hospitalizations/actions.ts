import { ActionTree } from 'vuex';

import IHospitalizationType from '@/interfaces/IHospitalizationType';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('hospitalizations');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  pdf: async (_, id: string): Promise<void> => {
    await httpClient.get<IHospitalizationType>({
      query: `pdf/${id}`,
      isBlob: true,
    });
  },
};

export default actions;
