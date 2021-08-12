import { MutationTree } from 'vuex';

import { State } from './state';
import { ICropper } from '@/interfaces/cropper/ICropper';

const mutations: MutationTree<State> = {
  open(state, cropper: ICropper) {
    state.cropper = cropper;
    state.cropper.isOpen = true;
  },
};

export default mutations;
