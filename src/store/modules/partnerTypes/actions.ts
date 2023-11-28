import { ActionTree } from 'vuex';

import PartnerType from '@/classes/PartnerType';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<PartnerType, State>('partner-types'),
};

export default actions;
