import { MutationTree } from 'vuex';

import HolidayForm from '@/classes/HolidayForm';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(HolidayForm),
};

export default mutations;