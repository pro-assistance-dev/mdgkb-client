import { GetterTree } from 'vuex';

import IDpoApplication from '@/interfaces/IDpoApplication';
import IForm from '@/interfaces/IForm';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IDpoApplication[] {
    return state.items;
  },
  item(state): IDpoApplication {
    return state.item;
  },
  formValue(state): IForm {
    return state.item.formValue;
  },
  emailExists(state): boolean {
    return state.emailExists;
  },
};

export default getters;
