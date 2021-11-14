import { Module } from 'vuex';

import Cropper from '@/classes/cropper/Cropper';
import RootState from '@/store/types';

import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const state: State = {
  cropper: new Cropper(),
  cropperV2: new Cropper(),
};

const namespaced = true;

export const cropper: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
};
