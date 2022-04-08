import { GetterTree } from 'vuex';

import IFormStatus from '@/interfaces/IFormStatus';
import IFormStatusToFormStatus from '@/interfaces/IFormStatusToFormStatus';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IFormStatus[] {
    return state.items;
  },
  item(state): IFormStatus {
    return state.item;
  },
  formStatusToFormStatuses(state): IFormStatusToFormStatus[] {
    return state.formStatusToFormStatuses;
  },
};

export default getters;
