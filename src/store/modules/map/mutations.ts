import { MutationTree } from 'vuex';

import { State } from './state';

const mutations: MutationTree<State> = {
  setBuildingANumber(state, buildingNumber: string) {
    state.buildingANumber = buildingNumber;
  },
  setBuildingBNumber(state, buildingNumber: string) {
    state.buildingBNumber = buildingNumber;
  },
  // showLoading(state) {
  //   state.loading = ElLoading.service({
  //     lock: true,
  //     text: 'Загрузка',
  //     spinner: 'el-icon-loading',
  //     background: 'rgba(0, 0, 0, 0.7)',
  //   });
  // },
  // closeLoading(state) {
  //   state.loading?.close();
  // },
  setLoading(state, value: boolean) {
    state.loading = value;
  },
};

export default mutations;
