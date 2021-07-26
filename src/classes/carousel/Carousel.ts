import ICarousel from '@/interfaces/carousels/ICarousel';
import ICarouselSlide from '@/interfaces/carousels/ICarouselSlide';
import CarouselSlide from '@/classes/carousel/CarouselSlide';

export default class Carousel implements ICarousel {
  id?: string;
  title: string = '';
  key: string = '';
  carouselSlides: ICarouselSlide[] = [];

  constructor(i?: ICarousel) {
    if (!i) return;
    this.id = i.id;
    this.title = i.title;
    this.key = i.key;
    this.carouselSlides = i.carouselSlides.map((item: ICarouselSlide) => new CarouselSlide(item));
  }
}
