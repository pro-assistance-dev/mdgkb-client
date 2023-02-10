import { GetterTree } from 'vuex';

import Employee from '@/classes/Employee';
import IHuman from '@/interfaces/IHuman';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Employee, State>(),
  human(state): IHuman {
    return state.item.human;
  },
};

export default getters;
