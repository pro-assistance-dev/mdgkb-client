import ICarousel from '@/interfaces/carousels/ICarousel';
import IFilesList from '@/interfaces/files/IFIlesList';

export interface State {
  items: ICarousel[];
  item: ICarousel;
  nowSlide: number;
  fileLists: Array<IFilesList[]>;
}
