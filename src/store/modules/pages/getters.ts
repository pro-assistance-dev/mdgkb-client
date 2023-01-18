import { GetterTree } from 'vuex';

import IFilesList from '@/interfaces/files/IFIlesList';
import IPage from '@/interfaces/page/IPage';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  pages(state): IPage[] {
    return state.pages;
  },
  page(state): IPage {
    return state.page;
  },
  galleryList(state): IFilesList[] {
    return state.galleryList;
  },
  isSideMenuDialogActive(state): boolean {
    return state.isSideMenuDialogActive;
  },
  isPageSectionDialogActive(state): boolean {
    return state.isPageSectionDialogActive;
  },
  sideMenu(state) {
    return state.page.pageSideMenus[state.index];
  },
  pageSection(state) {
    return state.page.pageSideMenus[state.index].pageSections[state.pageSectionIndex];
  },
};

export default getters;
