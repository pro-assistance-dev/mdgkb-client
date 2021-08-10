import { MutationTree } from 'vuex';

import Carousel from '@/classes/carousel/Carousel';
import ICarousel from '@/interfaces/carousels/ICarousel';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, items: ICarousel[]) {
    console.log(items);
    if (!items) return;
    state.items = items.map((i: ICarousel) => new Carousel(i));
  },
  appendToAll(state, item: ICarousel) {
    state.items.push(item);
    state.item = new Carousel();
  },
  set(state, item: ICarousel) {
    state.item = new Carousel(item);
  },
  remove(state, id: string) {
    const index = state.items.findIndex((i: ICarousel) => i.id === id);
    state.items.splice(index, 1);
  },
};

export default mutations;
