import { GetterTree } from 'vuex';

import RootState from '@/store/types';

import { State } from './state';
import ICarousel from '@/interfaces/carousels/ICarousel';
import Carousel from '@/classes/carousel/Carousel';

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
