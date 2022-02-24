import { GetterTree } from 'vuex';

import IEducationalManager from '@/interfaces/IEducationalManager';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';
import ITeacher from '@/interfaces/ITeacher';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  educationalOrganization(state): IEducationalOrganization {
    return state.educationalOrganization;
  },
  managers(state): IEducationalManager[] {
    return state.educationalOrganization.educationalOrganizationManagers;
  },
  teachers(state): ITeacher[] {
    return state.educationalOrganization.teachers;
  },
};

export default getters;
