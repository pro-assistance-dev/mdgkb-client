import { MutationTree } from 'vuex';

import ISchema from '@/interfaces/schema/ISchema';

import { State } from './state';

const mutations: MutationTree<State> = {
  setCount(state, count: number) {
    state.count = count;
  },
  setSchema(state, schema: ISchema) {
    state.schema = schema;
  },
};

export default mutations;
