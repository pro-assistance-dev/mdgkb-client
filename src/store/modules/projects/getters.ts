import { GetterTree } from 'vuex';

import Project from '@/classes/Project';
import ProjectItem from '@/classes/ProjectItem';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<Project, State>(),
  projectItems(state): ProjectItem[] {
    return state.item.projectItems;
  },
};

export default getters;
