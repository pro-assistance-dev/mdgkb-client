import { ActionTree } from 'vuex';

import PageSection from '@/services/classes/page/PageSection';
import getBaseActions from '@/store/baseModule/baseActions';
import { State } from '@/store/modules/pageSections/index';
import RootState from '@/store/types';

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<PageSection, State>('page-sections'),
};

export default actions;
