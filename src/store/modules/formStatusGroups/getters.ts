import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import getBaseGetters from '@/services/store/baseModule/baseGetters';
import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  showDialog(state): boolean {
    return state.showDialog;
  },
  dialogTitle(state): string {
    return state.dialogTitle;
  },
};

export default getters;
