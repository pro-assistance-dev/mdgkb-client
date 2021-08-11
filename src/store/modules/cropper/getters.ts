import { GetterTree } from 'vuex';

import { ICropper } from '@/interfaces/cropper/ICropper';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  cropper(state): ICropper {
    return state.cropper;
  },
  ratio(state): number {
    return state.cropper.ratio;
  },
};

export default getters;
