import { Module } from 'vuex';

import Division from '@/classes/buildings/Division';
import DivisionComment from '@/classes/buildings/DivisionComment';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    divisions: [],
    division: new Division(),
    galleryList: [],
    curGalleryCropIndex: 0,
    comment: new DivisionComment(),
    onlyShowed: false,
    count: 0,
  };
};

const state = getDefaultState();
const namespaced = true;

export const divisions: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
