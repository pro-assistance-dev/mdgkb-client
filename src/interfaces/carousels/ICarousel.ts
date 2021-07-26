import ICarouselSlide from '@/interfaces/carousels/ICarouselSlide';

export default interface ICarousel {
  id?: string;
  title: string;
  key: string;
  carouselSlides: ICarouselSlide[];
}
