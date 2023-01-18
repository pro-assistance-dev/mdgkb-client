import { MutationTree } from 'vuex';

import FileInfo from '@/classes/File/FileInfo';
import Page from '@/classes/page/Page';
import PageDocument from '@/classes/page/PageDocument';
import PageImage from '@/classes/page/PageImage';
import IFile from '@/interfaces/files/IFile';
import IPage from '@/interfaces/page/IPage';
import IPageImage from '@/interfaces/page/IPageImage';

import { getDefaultState } from '.';
import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, pages: IPage[]) {
    state.pages = pages.map((i: IPage) => new Page(i));
  },
  set(state, page?: IPage) {
    state.page = new Page(page);
    state.page.pageImages.forEach((i: IPageImage) => {
      if (!i.fileInfo) {
        return;
      }
      const file = i.fileInfo.getFileListObject();
      if (file) {
        state.galleryList.push(file);
      }
    });
  },
  resetState(state) {
    Object.assign(state, getDefaultState());
  },
  addDocument(state) {
    state.page.pageDocuments.push(new PageDocument());
  },
  remove(state, id: string) {
    const index = state.pages.findIndex((i: IPage) => i.id === id);
    state.pages.splice(index, 1);
  },
  pushToImages(state, file: IFile) {
    const image = FileInfo.CreatePreviewFile(file, 'gallery');
    if (image.fileSystemPath) {
      state.page.pageImagesNames.push(image.fileSystemPath);
    }
    state.page.pageImages.push(new PageImage({ fileInfo: image }));
  },
  saveFromCropperGallery(state, file: IFile) {
    const prevFileInfo = state.page.pageImages[state.curGalleryCropIndex].fileInfo;
    if (!prevFileInfo) {
      return;
    }
    const fileInfo = FileInfo.CreatePreviewFile(file, 'gallery');
    fileInfo.fileSystemPath = prevFileInfo.fileSystemPath;

    const i = state.page.pageImagesNames.findIndex((i: string) => i === fileInfo.fileSystemPath);
    if (i < 0 && fileInfo.fileSystemPath) {
      state.page.pageImagesNames.push(fileInfo.fileSystemPath);
    }

    state.page.pageImages[state.curGalleryCropIndex].fileInfo = fileInfo;
    if (fileInfo.fileSystemPath) {
      state.galleryList[state.curGalleryCropIndex] = {
        name: fileInfo.fileSystemPath,
        url: file.src,
      };
    }
  },
  setCurGalleryCropIndex(state, index: number) {
    state.curGalleryCropIndex = index;
  },
  removeFromGallery(state, file: IFile) {
    const index = state.galleryList.findIndex((i) => i.url === file.url);
    if (index > -1) {
      state.galleryList.splice(index, 1);
      const id = state.page.pageImages[index].id;
      if (id) {
        state.page.pageImagesForDelete.push(id);
      }
      state.page.pageImages.splice(index, 1);
    }
  },
  setSideMenuDialogActive(state, value: boolean) {
    state.isSideMenuDialogActive = value;
  },
  setPageSectionDialogActive(state, value: boolean) {
    state.isPageSectionDialogActive = value;
  },
  setIndex(state, value: number) {
    state.index = value;
  },
  setPageSectionIndex(state, value: number) {
    state.pageSectionIndex = value;
  },
};

export default mutations;
