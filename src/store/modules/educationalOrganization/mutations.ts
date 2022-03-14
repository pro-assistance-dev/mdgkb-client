import { MutationTree } from 'vuex';

import EducationalOrganization from '@/classes/EducationalOrganization';
import IEducationalOrganization from '@/interfaces/IEducationalOrganization';

import { State } from './state';

const mutations: MutationTree<State> = {
  set(state, educationalOrganization: IEducationalOrganization) {
    state.educationalOrganization = new EducationalOrganization(educationalOrganization);
    // if (state.item.fileInfo.fileSystemPath) state.fileList[0] = state.item.fileInfo.getFileListObject();
  },
};

export default mutations;
