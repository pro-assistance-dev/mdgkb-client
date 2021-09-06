import { Module } from 'vuex';

import Doctor from '@/classes/doctors/Doctor';
import DoctorComment from '@/classes/doctors/DoctorComment';
import RootState from '@/store/types';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { State } from './state';

export const getDefaultState = (): State => {
  return {
    doctors: [],
    filteredDoctors: [],
    doctor: new Doctor(),
    divisionDoctors: [],
    fileList: [],
    comment: new DoctorComment(),
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
