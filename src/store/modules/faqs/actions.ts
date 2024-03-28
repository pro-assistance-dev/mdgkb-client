import { ActionTree } from 'vuex';

import Faq from '@/classes/Faq';
import IFaqWithDeleted from '@/interfaces/IFaqWithDeleted';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('faqs');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Faq, State>(httpClient),
  updateAll: async (_, items: IFaqWithDeleted): Promise<void> => {
    await httpClient.put<IFaqWithDeleted, IFaqWithDeleted>({ payload: items });
  },
};

export default actions;
