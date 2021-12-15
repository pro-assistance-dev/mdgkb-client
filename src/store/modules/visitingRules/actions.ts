import { ActionTree } from 'vuex';

import IVisitingRule from '@/interfaces/IVisitingRule';
import IVisitingRuleWithDeleted from '@/interfaces/IVisitingRuleWithDeleted';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('visiting-rules');

const actions: ActionTree<State, RootState> = {
  getAll: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get<IVisitingRule[]>());
  },
  updateAll: async ({ commit, state }): Promise<void> => {
    const res = await httpClient.put<IVisitingRuleWithDeleted, IVisitingRuleWithDeleted>({
      payload: { visitingRules: state.items, visitingRulesForDelete: state.itemsForDelete },
    });
    commit('setAll', res);
  },
};

export default actions;
