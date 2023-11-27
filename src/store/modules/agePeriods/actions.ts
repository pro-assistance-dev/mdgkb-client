import { ActionTree } from 'vuex';

import DietAge from '@/classes/DietAge';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<DietAge, State>('age-periods'),
};

export default actions;
