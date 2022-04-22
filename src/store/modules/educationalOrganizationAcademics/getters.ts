import { GetterTree } from 'vuex';

import IEducationalOrganizationAcademic from '@/interfaces/IEducationalOrganizationAcademic';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IEducationalOrganizationAcademic[] {
    return state.items;
  },
  item(state): IEducationalOrganizationAcademic {
    return state.item;
  },
};

export default getters;
