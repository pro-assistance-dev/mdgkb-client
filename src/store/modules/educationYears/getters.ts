import { GetterTree } from 'vuex';

import EducationYear from '@/classes/EducationYear';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<EducationYear, State>(),
};

export default getters;
