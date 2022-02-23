import { MutationTree } from 'vuex';

import EducationalOrganization from '@/classes/EducationalOrganization';
import EducationalOrganizationProperty from '@/classes/EducationalOrganizationProperty';
import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import ITeacher from '@/interfaces/educationalOrganization/ITeacher';

import { State } from './state';

const mutations: MutationTree<State> = {
  set(state, educationalOrganization: IEducationalOrganization) {
    state.educationalOrganization = new EducationalOrganization(educationalOrganization);
    // if (state.item.fileInfo.fileSystemPath) state.fileList[0] = state.item.fileInfo.getFileListObject();
  },
  addProperty(state) {
    state.educationalOrganization.educationalOrganizationProperties.push(new EducationalOrganizationProperty());
  },
  removeProperty(state, id: string) {
    const index = state.educationalOrganization.educationalOrganizationProperties.findIndex(
      (i: EducationalOrganizationProperty) => i.id === id
    );
    if (index) {
      state.educationalOrganization.educationalOrganizationProperties.splice(index, 1);
    }
    state.educationalOrganization.educationalOrganizationPropertiesForDelete.push(id);
  },
  addManager(state, manager: IEducationalOrganizationManager) {
    state.educationalOrganization.educationalOrganizationManagers.push(manager);
  },
  removeManager(state, index: number) {
    const id = state.educationalOrganization.educationalOrganizationManagers[index].id;
    if (id) {
      state.educationalOrganization.educationalOrganizationManagersForDelete.push(id);
    }
    state.educationalOrganization.educationalOrganizationManagers.splice(index, 0);
  },
  addTeacher(state, teacher: ITeacher) {
    state.educationalOrganization.teachers.push(teacher);
  },
  removeTeacher(state, index: number) {
    const id = state.educationalOrganization.teachers[index].id;
    if (id) {
      state.educationalOrganization.teachersForDelete.push(id);
    }
    state.educationalOrganization.teachers.splice(index, 0);
  },
};

export default mutations;
