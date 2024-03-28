import { MutationTree } from 'vuex';

import FileInfo from '@/classes/FileInfo';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<FileInfo, State>(FileInfo),
};

export default mutations;
