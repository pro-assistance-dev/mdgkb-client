import { MutationTree } from 'vuex';

import Appointment from '@/classes/Appointment';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Appointment, State>(Appointment),
};

export default mutations;
