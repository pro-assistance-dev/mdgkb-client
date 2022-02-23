import { GetterTree } from 'vuex';

import ITeacher from '@/interfaces/educationalOrganization/ITeacher';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ITeacher[] {
    return state.items;
  },
  item(state): ITeacher {
    return state.item;
  },
};

export default getters;
