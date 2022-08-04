import { GetterTree } from 'vuex';

import IForm from '@/interfaces/IForm';
import IResidencyApplication from '@/interfaces/IResidencyApplication';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IResidencyApplication[] {
    return state.items;
  },
  item(state): IResidencyApplication {
    return state.item;
  },
  formValue(state): IForm {
    return state.item.formValue;
  },
  emailExists(state): boolean {
    return state.emailExists;
  },
  typeExists(state): boolean {
    return state.typeExists;
  },
  count(state): number {
    return state.count;
  },
};

export default getters;
