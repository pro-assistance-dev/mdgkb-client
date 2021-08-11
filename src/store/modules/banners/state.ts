import IBanner from '@/interfaces/banners/IBanner';

export interface State {
  banners: IBanner[];
  banner?: IBanner;
}
