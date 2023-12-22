import { ActionTree } from 'vuex';

import ChartData from '@/classes/ChartData';
import ExportOptions from '@/classes/ExportOptions';
import Cache from '@/services/Cache';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

const cache = new Cache();
cache.name = 'searchGroups';

const httpClient = new HttpClient('export-data');

const actions: ActionTree<RootState, RootState> = {
  data: async (_, exportOptions: ExportOptions): Promise<void | ChartData> => {
    return await httpClient.get<ChartData>({
      query: `data?exportOptions=${JSON.stringify(exportOptions)}`,
    });
  },
};

export default actions;
