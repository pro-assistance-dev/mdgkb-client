import { GetterTree } from 'vuex';

import IEducationalOrganization from '@/interfaces/educationalOrganization/IEducationalOrganization';
import IEducationalOrganizationManager from '@/interfaces/educationalOrganization/IEducationalOrganizationManager';
import ITeacher from '@/interfaces/educationalOrganization/ITeacher';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  educationalOrganization(state): IEducationalOrganization {
    return state.educationalOrganization;
  },
  managers(state): IEducationalOrganizationManager[] {
    return state.educationalOrganization.educationalOrganizationManagers;
  },
  teachers(state): ITeacher[] {
    return state.educationalOrganization.teachers;
  },
};

export default getters;
