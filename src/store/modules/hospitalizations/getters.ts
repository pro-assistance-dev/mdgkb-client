import { GetterTree } from 'vuex';

import IHospitalization from '@/interfaces/hospitalizations/IHospitalization';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  paidHospitalizations(state): IHospitalization[] {
    return state.paidHospitalizations;
  },
  insuranceHospitalizations(state): IHospitalization[] {
    return state.insuranceHospitalizations;
  },
};

export default getters;
