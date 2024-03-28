import { ActionTree } from 'vuex';

import SideOrganization from '@/classes/SideOrganization';
import getBaseActions from '@/services/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<SideOrganization, State>('side-organizations'),
};

export default actions;
