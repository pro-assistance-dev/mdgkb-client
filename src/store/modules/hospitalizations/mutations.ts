import { MutationTree } from 'vuex';

import Hospitalization from '@/classes/hospitalizations/Hospitalization';
import IHospitalization from '@/interfaces/hospitalizatoins/IHospitalization';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, hospitalizations: IHospitalization[]) {
    state.paidHospitalizations = [];
    state.insuranceHospitalizations = [];
    hospitalizations?.forEach((item: IHospitalization) => {
      if (item.paid) {
        state.paidHospitalizations.push(new Hospitalization(item));
      } else {
        state.insuranceHospitalizations.push(new Hospitalization(item));
      }
    });
  },
};

export default mutations;
