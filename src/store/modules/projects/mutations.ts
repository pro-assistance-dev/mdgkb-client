import { MutationTree } from 'vuex';

import Project from '@/classes/Project';
import ProjectItem from '@/classes/ProjectItem';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Project, State>(Project),
  addProjectItem(state) {
    state.item.projectItems.push(ProjectItem.NewTab());
  },
  removeProjectItem(state, index: number) {
    const id = state.item.projectItems[index].id;
    if (id) {
      state.item.projectItemsForDelete.push(id);
    }
    state.item.projectItems.splice(index, 1);
  },
};

export default mutations;
