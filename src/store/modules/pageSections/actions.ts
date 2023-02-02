import { ActionTree } from 'vuex';

import Page from '@/classes/page/Page';
import getBaseActions from '@/store/baseModule/baseActions';
import { State } from '@/store/modules/pageSections/index';
import RootState from '@/store/types';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<Page, State>('page-sections'),
};

export default actions;
