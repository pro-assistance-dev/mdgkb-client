import { GetterTree } from 'vuex';

import IApplicationsCount from '@/interfaces/IApplicationsCount';
import ISocialMedia from '@/interfaces/ISocialMedia';
import ISchema from '@/interfaces/schema/ISchema';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  count(state): number {
    return state.count;
  },
  schema(state): ISchema | undefined {
    return state.schema;
  },
  socialMedia(state): ISocialMedia[] {
    return state.socialMedia;
  },
  applicationsCounts(state): IApplicationsCount[] {
    return state.applicationsCounts;
  },
  applicationsCount(state): (tableName: string) => number {
    return (tableName: string): number => {
      const applicationsCount = state.applicationsCounts.find((item: IApplicationsCount) => item.tableName === tableName);
      return applicationsCount?.count || 0;
    };
  },
};

export default getters;
