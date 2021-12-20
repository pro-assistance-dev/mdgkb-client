import { GetterTree } from 'vuex';

import IProject from '@/interfaces/projects/IProject';
import IProjectItem from '@/interfaces/projects/IProjectItem';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): IProject[] {
    return state.items;
  },
  item(state): IProject {
    return state.item;
  },
  projectItems(state): IProjectItem[] {
    return state.item.projectItems;
  },
};

export default getters;
