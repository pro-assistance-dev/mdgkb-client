import ICarousel from '@/interfaces/carousels/ICarousel';

export interface State {
  items: ICarousel[];
  item?: ICarousel;
}
