import { ActionTree } from 'vuex';

import Address from '@/classes/Address';
import KladrApi from '@/classes/KladrApi';
import SocialMedia from '@/classes/SocialMedia';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('meta');

const actions: ActionTree<State, RootState> = {
  getCount: async ({ commit }, table: string): Promise<void> => {
    commit('setCount', await httpClient.get<number>({ query: `count/${table}` }));
  },
  getSocialMedia: async ({ commit }): Promise<void> => {
    commit('setSocialMedia', await httpClient.get<number>({ query: `social` }));
  },
  getAddress: async ({ commit, state }, query: string): Promise<void> => {
    commit('setAddresses', await httpClient.post<KladrApi, Address[]>({ query: `address`, payload: state.kladrAPI, isFormData: true }));
  },
};

export default actions;
