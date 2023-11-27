import { GetterTree } from 'vuex';

import FormStatus from '@/classes/FormStatus';
import FormStatusToFormStatus from '@/classes/FormStatusToFormStatus';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): FormStatus[] {
    return state.items;
  },
  item(state): FormStatus {
    return state.item;
  },
  formStatusToFormStatuses(state): FormStatusToFormStatus[] {
    return state.formStatusToFormStatuses;
  },
};

export default getters;
