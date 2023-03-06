import { MutationTree } from 'vuex';

import Project from '@/classes/Project';
import ProjectItem from '@/classes/ProjectItem';
import IProject from '@/interfaces/projects/IProject';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: IProject[]) {
    state.items = items.map((i: IProject) => new Project(i));
  },
  set(state, item: IProject) {
    state.item = new Project(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: IProject) => i.id === id);
    state.items.splice(index, 1);
  },
  resetItem(state) {
    state.item = new Project();
  },
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
