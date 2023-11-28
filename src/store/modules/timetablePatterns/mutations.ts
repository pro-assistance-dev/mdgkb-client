import { MutationTree } from 'vuex';

import Timetable from '@/classes/Timetable';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Timetable, State>(Timetable),
};

export default mutations;
