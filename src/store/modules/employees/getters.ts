import { GetterTree } from 'vuex';

import Employee from '@/classes/Employee';
import IEducation from '@/interfaces/education/IEducation';
import IHuman from '@/interfaces/IHuman';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Employee, State>(),
  human(state): IHuman {
    return state.item.human;
  },
  educations(state): IEducation[] {
    return state.item.educations;
  },
};

export default getters;
