import { GetterTree } from 'vuex';

import IFormStatusGroup from '@/interfaces/IFormStatusGroup';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IFormStatusGroup[] {
    return state.items;
  },
  item(state): IFormStatusGroup {
    return state.item;
  },
  count(state): number {
    return state.count;
  },
  showDialog(state): boolean {
    return state.showDialog;
  },
  dialogTitle(state): string {
    return state.dialogTitle;
  },
};

export default getters;
