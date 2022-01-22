import { GetterTree } from 'vuex';

import ISocial from '@/interfaces/ISocial';
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
  socials(state): ISocial[] {
    return state.socials;
  },
};

export default getters;
