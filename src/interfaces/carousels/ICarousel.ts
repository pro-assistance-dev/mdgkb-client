import ICarouselSlide from '@/interfaces/carousels/ICarouselSlide';

export default interface ICarousel {
  id?: string;
  title: string;
  systemKey: string;
  carouselSlides: ICarouselSlide[];
  carouselSlidesNames: string[];
  carouselSlidesForDelete: string[];
}
