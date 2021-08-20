import IDivision from '@/interfaces/buildings/IDivision';
import IFilesList from '@/interfaces/files/IFIlesList';

export interface State {
  divisions: IDivision[];
  division: IDivision;
  galleryList: IFilesList[];
  curGalleryCropIndex: number;
}
