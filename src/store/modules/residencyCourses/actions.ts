import { ActionTree } from 'vuex';

import ResidencyCourse from '@/classes/ResidencyCourse';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<ResidencyCourse, State>('residency-courses'),
};

export default actions;
