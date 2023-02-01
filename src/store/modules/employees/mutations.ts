import { MutationTree } from 'vuex';

import Education from '@/classes/educations/Education';
import EducationAccreditation from '@/classes/educations/EducationAccreditation';
import EducationCertification from '@/classes/educations/EducationCertification';
import Employee from '@/classes/Employee';
import Regalia from '@/classes/Regalia';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './state';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Employee, State>(Employee),
  addEducation(state) {
    state.item.educations.push(new Education());
  },
  removeEducation(state, educationIndex: number) {
    state.item.educations.splice(educationIndex, 1);
  },
  addCertification(state, educationIndex: number) {
    state.item.educations[educationIndex].educationCertification = new EducationCertification();
  },
  removeCertification(state, educationIndex: number) {
    state.item.educations[educationIndex].educationCertification = undefined;
  },
  addAccreditation(state, educationIndex: number) {
    state.item.educations[educationIndex].educationAccreditation = new EducationAccreditation();
  },
  removeAccreditation(state, educationIndex: number) {
    state.item.educations[educationIndex].educationAccreditation = undefined;
  },
  addRegalia(state) {
    state.item.regalias.push(new Regalia());
  },
};

export default mutations;
