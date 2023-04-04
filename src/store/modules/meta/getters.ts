import { GetterTree } from 'vuex';

import SocialMedia from '@/classes/SocialMedia';
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
};

export default getters;
