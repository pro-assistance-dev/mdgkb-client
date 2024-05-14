import { MutationTree } from 'vuex';

import Form from '@/classes/Form';
import FormStatus from '@/classes/FormStatus';

import getBaseMutations from '@/services/store/baseModule/baseMutations';
import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations(Form),
  resetItem(state) {
    state.item = new Form();
  },
  resetDefaultFormStatus(state) {
    state.item.defaultFormStatus = new FormStatus();
  },
};

export default mutations;
