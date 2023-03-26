import { MutationTree } from 'vuex';

import Cropper from '@/services/classes/Cropper';

import { State } from './state';

const mutations: MutationTree<State> = {
  open(state, cropper: Cropper) {
    state.cropper = cropper;
  },
};

export default mutations;
