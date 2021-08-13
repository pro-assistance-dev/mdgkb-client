import { MutationTree } from 'vuex';

import Banner from '@/classes/banners/Banner';
import IBanner from '@/interfaces/banners/IBanner';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, banners: IBanner[]) {
    state.banners = banners?.map((a: IBanner) => new Banner(a));
  },
  set(state, banner: IBanner) {
    state.banner = new Banner(banner);
    if (state.banner.fileInfo.fileSystemPath) state.fileList[0] = state.banner.fileInfo.getFileListObject();
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  remove(state, id: string) {
    const index = state.banners.findIndex((i: IBanner) => i.id === id);
    state.banners.splice(index, 1);
  },
  setFile(state, file: IFile) {
    state.banner.fileInfo.file = file.blob;
    state.banner.fileInfo.category = 'banners';
    if (state.banner.fileInfo.fileSystemPath) {
      state.fileList[0] = { name: state.banner.fileInfo.fileSystemPath, url: file.src };
    }
  },
  setFileInfo(state, fileInfo: IFileInfo) {
    state.banner.fileInfo = fileInfo;
    // TODO достать url из el-upload
    // if (state.banner.fileInfo.fileSystemPath) {
    //   state.fileList[0] = { name: state.banner.fileInfo.fileSystemPath, url: ??? };
    // }
  },
  moveUp(state, index: number) {
    const elementToMove = state.banners[index];
    state.banners[index] = state.banners[index - 1];
    state.banners[index - 1] = elementToMove;
  },
  moveDown(state, index: number) {
    const elementToMove = state.banners[index];
    state.banners[index] = state.banners[index + 1];
    state.banners[index + 1] = elementToMove;
  },
  updateOrder(state) {
    state.banners = state.banners.map((banner, index) => {
      banner.listNumber = index;
      return banner;
    });
  },
};

export default mutations;
