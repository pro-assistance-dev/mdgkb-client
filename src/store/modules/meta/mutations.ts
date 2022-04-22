import { MutationTree } from 'vuex';

import SocialMedia from '@/classes/SocialMedia';
import IApplicationsCount from '@/interfaces/IApplicationsCount';
import ISocialMedia from '@/interfaces/ISocialMedia';
import ISchema from '@/interfaces/schema/ISchema';

import { State } from './state';

const mutations: MutationTree<State> = {
  setCount(state, count: number) {
    state.count = count;
  },
  setSchema(state, schema: ISchema) {
    state.schema = schema;
  },
  setSocialMedia(state, items: ISocialMedia[]) {
    state.socialMedia = items.map((i: ISocialMedia) => new SocialMedia(i));
  },
  setApplicationsCounts(state, items: IApplicationsCount[]) {
    state.applicationsCounts = items;
  },
};

export default mutations;
