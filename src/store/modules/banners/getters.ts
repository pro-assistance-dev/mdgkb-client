import { GetterTree } from 'vuex';

import IBanner from '@/interfaces/banners/IBanner';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFilesList from '@/interfaces/files/IFIlesList';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  banners(state): IBanner[] | undefined {
    const { banners } = state;
    return banners;
  },
  banner(state): IBanner | undefined {
    const { banner } = state;
    return banner;
  },
  fileInfo(state): IFileInfo {
    return state.banner.fileInfo;
  },
  fileList(state): IFilesList[] {
    return state.fileList;
  },
};

export default getters;
