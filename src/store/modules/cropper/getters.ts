import { GetterTree } from 'vuex';

import Cropper from '@/services/classes/Cropper';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  cropper(state): Cropper {
    return state.cropper;
  },
  ratio(state): number {
    return state.cropper.ratio;
  },
};

export default getters;
