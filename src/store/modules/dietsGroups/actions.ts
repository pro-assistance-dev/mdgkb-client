import { ActionTree } from 'vuex';

import DietGroup from '@/classes/DietGroup';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DietGroup, State>('diets-groups'),
};

export default actions;
