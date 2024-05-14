import { ActionTree } from 'vuex';

import Head from '@/classes/Head';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Head, State>('heads'),
};

export default actions;
