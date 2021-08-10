import ICarousel from '@/interfaces/carousels/ICarousel';
import ICarouselSlide from '@/interfaces/carousels/ICarouselSlide';
import CarouselSlide from '@/classes/carousel/CarouselSlide';

export default class Carousel implements ICarousel {
  id?: string;
  title = '';
  systemKey = '';
  carouselSlides: ICarouselSlide[] = [];
  carouselSlidesNames: string[] = [];
  carouselSlidesForDelete: string[] = [];

  constructor(i?: ICarousel) {
    if (!i) return;
    this.id = i.id;
    this.title = i.title;
    this.systemKey = i.systemKey;
    if (i.carouselSlides) this.carouselSlides = i.carouselSlides.map((item: ICarouselSlide) => new CarouselSlide(item));
  }
}
