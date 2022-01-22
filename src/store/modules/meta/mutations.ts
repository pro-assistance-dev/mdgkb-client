import { MutationTree } from 'vuex';

import Social from '@/classes/Social';
import ISocial from '@/interfaces/ISocial';
import ISchema from '@/interfaces/schema/ISchema';

import { State } from './state';

const mutations: MutationTree<State> = {
  setCount(state, count: number) {
    state.count = count;
  },
  setSchema(state, schema: ISchema) {
    state.schema = schema;
  },
  setSocials(state, items: ISocial[]) {
    state.socials = items.map((i: ISocial) => new Social(i));
  },
};

export default mutations;
