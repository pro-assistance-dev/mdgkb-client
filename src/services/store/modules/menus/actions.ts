import { ActionTree } from 'vuex';

import Menu from '@/services/classes/Menu';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Menu, State>('menus'),
};

export default actions;
