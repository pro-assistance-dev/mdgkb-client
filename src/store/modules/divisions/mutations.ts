import { MutationTree } from 'vuex';

import Division from '@/classes/Division';
import DivisionComment from '@/classes/DivisionComment';
import Schedule from '@/classes/Schedule';
import ScheduleItem from '@/classes/ScheduleItems';
import Timetable from '@/classes/Timetable';
import TimetableDay from '@/classes/TimetableDay';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { getDefaultState } from '.';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Division),
};

export default mutations;
