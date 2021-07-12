import { GetterTree } from 'vuex';

import IDivision from '@/interfaces/divisions/IDivision';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  divisions(state): IDivision[] | undefined {
    const { divisions } = state;
    return divisions;
  },
  division(state): IDivision | undefined {
    const { division } = state;
    return division;
  },
};

export default getters;
