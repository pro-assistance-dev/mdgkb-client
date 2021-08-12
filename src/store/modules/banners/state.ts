import IBanner from '@/interfaces/banners/IBanner';
import IFilesList from '@/interfaces/files/IFIlesList';

export interface State {
  banners: IBanner[];
  banner: IBanner;
  fileList: IFilesList[];
}
