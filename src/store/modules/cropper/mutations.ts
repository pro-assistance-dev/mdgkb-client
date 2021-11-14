import { MutationTree } from 'vuex';

import { ICropper } from '@/interfaces/cropper/ICropper';

import { State } from './state';

const mutations: MutationTree<State> = {
  open(state, cropper: ICropper) {
    state.cropper = cropper;
    state.cropper.isOpen = true;
  },
  openV2(state, cropper: ICropper) {
    state.cropperV2 = cropper;
    state.cropperV2.isOpen = true;
  },
  close(state) {
    state.cropper.isOpen = false;
  },
};

export default mutations;
