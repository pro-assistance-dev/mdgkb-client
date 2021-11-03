import { MutationTree } from 'vuex';

import EducationalOrganization from '@/classes/educationalOrganization/EducationalOrganization';
import EducationalOrganizationProperty from '@/classes/educationalOrganization/EducationalOrganizationProperty';
import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';

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
  addTeacher(state, teacher: IEducationalOrganizationTeacher) {
    state.educationalOrganization.educationalOrganizationTeachers.push(teacher);
  },
  removeTeacher(state, index: number) {
    const id = state.educationalOrganization.educationalOrganizationTeachers[index].id;
    if (id) {
      state.educationalOrganization.educationalOrganizationTeachersForDelete.push(id);
    }
    state.educationalOrganization.educationalOrganizationTeachers.splice(index, 0);
  },
};

export default mutations;
