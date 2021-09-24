import { GetterTree } from 'vuex';

import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import IEducationalOrganizationTeacher from '@/interfaces/educationalOrganization/IEducationalOrganizationTeacher';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  educationalOrganization(state): IEducationalOrganization {
    return state.educationalOrganization;
  },
  managers(state): IEducationalOrganizationManager[] {
    return state.educationalOrganization.educationalOrganizationManagers;
  },
  teachers(state): IEducationalOrganizationTeacher[] {
    return state.educationalOrganization.educationalOrganizationTeachers;
  },
};

export default getters;
