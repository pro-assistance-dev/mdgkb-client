import { ActionTree } from 'vuex';

import Specialization from '@/classes/Specialization';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Specialization, State>('specializations'),
};

export default actions;
