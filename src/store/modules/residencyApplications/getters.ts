import { GetterTree } from 'vuex';

import Form from '@/classes/Form';
import ResidencyApplication from '@/classes/ResidencyApplication';
import getBaseGetters from '@/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<ResidencyApplication, State>(),
  formValue(state): Form {
    return state.item.formValue;
  },
  emailExists(state): boolean {
    return state.emailExists;
  },
  typeExists(state): boolean {
    return state.typeExists;
  },
};

export default getters;
