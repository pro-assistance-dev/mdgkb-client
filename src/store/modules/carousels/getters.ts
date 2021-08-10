import { GetterTree } from 'vuex';

import Carousel from '@/classes/carousel/Carousel';
import ICarousel from '@/interfaces/carousels/ICarousel';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  items(state): ICarousel[] | undefined {
    return state.items;
  },
  item(state): ICarousel | undefined {
    if (!state.item) state.item = new Carousel();
    return state.item;
  },
};

export default getters;
