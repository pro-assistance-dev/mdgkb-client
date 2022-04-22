import { MutationTree } from 'vuex';

import EducationalOrganizationAcademic from '@/classes/EducationalOrganizationAcademic';
import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IEducationalOrganizationAcademic[]) {
    state.items = items.map((a: IEducationalOrganizationAcademic) => new EducationalOrganizationAcademic(a));
  },
  appendToAll(state, items: IEducationalOrganizationAcademic[]) {
    const itemsForAdding = items.map((i: IEducationalOrganizationAcademic) => new EducationalOrganizationAcademic(i));
    state.items.push(...itemsForAdding);
  },
  set(state, item: IEducationalOrganizationAcademic) {
    state.item = new EducationalOrganizationAcademic(item);
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IEducationalOrganizationAcademic) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new EducationalOrganizationAcademic();
  },
};

export default mutations;
