import { ActionTree } from 'vuex';

import TreatDirection from '@/classes/TreatDirection';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<TreatDirection, State>('treat-directions'),
};

export default actions;
