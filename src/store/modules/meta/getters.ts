import { GetterTree } from 'vuex';

import SocialMedia from '@/classes/SocialMedia';
import IApplicationsCount from '@/interfaces/IApplicationsCount';
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
  socialMedia(state): SocialMedia[] {
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
