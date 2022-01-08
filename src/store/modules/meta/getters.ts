import { GetterTree } from 'vuex';

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
};

export default getters;
