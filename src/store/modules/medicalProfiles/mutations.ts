import { MutationTree } from 'vuex';

import MedicalProfile from '@/classes/MedicalProfile';
import IMedicalProfile from '@/interfaces/IMedicalProfile';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IMedicalProfile[]) {
    state.items = items?.map((a: IMedicalProfile) => new MedicalProfile(a));
  },
  set(state, item: IMedicalProfile) {
    state.item = new MedicalProfile(item);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
};

export default mutations;
