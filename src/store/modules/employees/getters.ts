import { GetterTree } from 'vuex';

import IEducation from '@/interfaces/education/IEducation';
import IEmployee from '@/interfaces/IEmployee';
import IHuman from '@/interfaces/IHuman';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IEmployee[] {
    return state.items;
  },
  item(state): IEmployee {
    return state.item;
  },
  human(state): IHuman {
    return state.item.human;
  },
  educations(state): IEducation[] {
    return state.item.educations;
  },
};

export default getters;
