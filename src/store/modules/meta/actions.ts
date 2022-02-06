import { ActionTree } from 'vuex';

import IOption from '@/interfaces/schema/IOption';
import ISchemaWithOptions from '@/interfaces/schema/ISchemaWithOptions';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

import { State } from './state';

const httpClient = new HttpClient('meta');

const actions: ActionTree<State, RootState> = {
  getCount: async ({ commit }, table: string): Promise<void> => {
    commit('setCount', await httpClient.get<number>({ query: `count/${table}` }));
  },
  getOptions: async ({ commit }, schema: ISchemaWithOptions): Promise<void> => {
    const tableName = `tableName=${schema.tableName}`;
    const value = `value=${schema.value}`;
    const label = `label=${schema.label}`;
    const query = `options/?${tableName}&${value}&${label}`;
    console.log(query);
    const options = await httpClient.get<IOption[]>({ query: `${query}` });
    if (options) {
      schema.options = options;
    }
  },
  getSchema: async ({ commit }): Promise<void> => {
    const data = await httpClient.get<number>({ query: `schema` });
    commit('setSchema', data);
  },
  getSocialMedia: async ({ commit }): Promise<void> => {
    commit('setSocialMedia', await httpClient.get<number>({ query: `social` }));
  },
};

export default actions;
