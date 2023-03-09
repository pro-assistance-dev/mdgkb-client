import { ActionTree } from 'vuex';

import Banner from '@/classes/Banner';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Banner, State>('banners'),
};

export default actions;
