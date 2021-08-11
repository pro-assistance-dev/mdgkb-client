import { MutationTree } from 'vuex';

import Carousel from '@/classes/carousel/Carousel';
import FileInfo from '@/classes/File/FileInfo';
import ICarousel from '@/interfaces/carousels/ICarousel';
import ICarouselSlide from '@/interfaces/carousels/ICarouselSlide';
import IFile from '@/interfaces/files/IFile';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ICarousel[]) {
    if (!items) return;
    state.items = items.map((i: ICarousel) => new Carousel(i));
  },
  appendToAll(state, item: ICarousel) {
    state.items.push(item);
    state.item = new Carousel();
  },
  set(state, item: ICarousel) {
    state.item = new Carousel(item);
    item.carouselSlides.forEach((slide: ICarouselSlide, i: number) => {
      state.fileLists[i] = [];
      state.fileLists[i].push({
        name: item.carouselSlides[i].fileInfo.originalName,
        url: `${process.env.VUE_APP_STATIC_URL}/${item.carouselSlides[i].fileInfo.fileSystemPath}`,
      });
    });
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ICarousel) => i.id === id);
    state.items.splice(index, 1);
  },
  setNowSlide(state, i: number) {
    state.nowSlide = i;
  },
  setSlide(state, file: IFile) {
    if (!state.item.carouselSlides[state.nowSlide].fileInfo) {
      state.item.carouselSlides[state.nowSlide].fileInfo = new FileInfo();
    }
    const id = state.item.carouselSlides[state.nowSlide].fileInfo.id;
    state.item.carouselSlides[state.nowSlide].fileInfo = FileInfo.CreatePreviewFile(file, 'slide', id);
    const name = state.item.carouselSlides[state.nowSlide].fileInfo.fileSystemPath;
    if (name) {
      state.item.carouselSlidesNames[state.nowSlide] = name;
    } else {
      const n = state.item.carouselSlides[state.nowSlide].fileInfo.fileSystemPath;
      if (n) state.item.carouselSlidesNames.push(n);
    }
  },
  saveFromCropper(state, file: IFile) {
    state.item.carouselSlides[state.nowSlide].fileInfo.file = file.blob;
    state.item.carouselSlides[state.nowSlide].fileInfo.category = 'slide';
    const name = state.item.carouselSlides[state.nowSlide].fileInfo.fileSystemPath;
    if (name) state.fileLists[state.nowSlide][0] = { name: name, url: file.src };
  },
};

export default mutations;
