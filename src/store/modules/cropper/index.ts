import { Module } from 'vuex';

import Cropper from '@/services/classes/Cropper';
import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  cropper: new Cropper(),
  curGalleryCropIndex: 0,
};

const namespaced = true;

export const cropper: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
};
