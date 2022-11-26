import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import Hospitalization from '@/classes/hospitalizations/Hospitalization';
import HospitalizationType from '@/classes/hospitalizations/HospitalizationType';
import IHospitalization from '@/interfaces/IHospitalization';
import IHospitalizationType from '@/interfaces/IHospitalizationType';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, hospitalizations: IHospitalization[]) {
    state.items = hospitalizations.map((item: IHospitalization) => new Hospitalization(item));
  },
  set(state, item: IHospitalization) {
    state.item = new Hospitalization(item);
  },
  selectHospitalization(state, item: IHospitalizationType) {
    state.item.hospitalizationType = new HospitalizationType(item);
    state.item.hospitalizationTypeId = item.id;
    state.item.formValue = new Form(item.formPattern);
  },
};

export default mutations;
