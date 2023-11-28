import { GetterTree } from 'vuex';

import FormStatusGroup from '@/classes/FormStatusGroup';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): FormStatusGroup[] {
    return state.items;
  },
  item(state): FormStatusGroup {
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
