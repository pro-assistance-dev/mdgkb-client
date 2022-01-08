import { Module } from 'vuex';

import Doctor from '@/classes/Doctor';
import DoctorComment from '@/classes/DoctorComment';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    items: [],
    item: new Doctor(),
    filteredDoctors: [],
    divisionDoctors: [],
    fileList: [],
    comment: new DoctorComment(),
    count: 0,
  };
};

const state = getDefaultState();
const namespaced = true;

export const doctors: Module<State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
