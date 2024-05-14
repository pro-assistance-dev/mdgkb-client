import { GetterTree } from 'vuex';

import Form from '@/classes/Form';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters(),
  formValue(state): Form {
    return state.item.formValue;
  },
  emailExists(state): boolean {
    return state.emailExists;
  },
};

export default getters;
