import { ActionTree } from 'vuex';

import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('form-values');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions(httpClient),
  documentsToPdf: async (_, id: string): Promise<void> => {
    await httpClient.get<undefined>({
      query: `documents-to-pdf/${id}`,
      isBlob: true,
      downloadFileName: 'Документы.pdf',
    });
  },
  documentsToZip: async (_, { id, name }): Promise<void> => {
    await httpClient.get<undefined>({
      query: `documents-to-zip/${id}`,
      isBlob: true,
      downloadFileName: name,
    });
  },
};

export default actions;
