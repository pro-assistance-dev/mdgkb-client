import { ActionTree } from 'vuex';

import Diet from '@/classes/Diet';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Diet, State>('diets'),
};

export default actions;
