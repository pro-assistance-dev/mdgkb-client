import { GetterTree } from 'vuex';

import Division from '@/classes/Division';
import DivisionComment from '@/classes/DivisionComment';
import Schedule from '@/classes/Schedule';
import Timetable from '@/classes/Timetable';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  // getDrugById(state): (id: string) => IDrug | undefined {
  //   return (id: string): IDrug | undefined => state.drugs.find((item: IDrug) => item.id === id);
  // },
};

export default getters;
