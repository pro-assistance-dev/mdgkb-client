import IDivision from '@/interfaces/buildings/IDivision';
import IDivisionComment from '@/interfaces/buildings/IDivisionComment';
import IFilesList from '@/interfaces/files/IFIlesList';

export interface State {
  divisions: IDivision[];
  division: IDivision;
  galleryList: IFilesList[];
  curGalleryCropIndex: number;
  comment: IDivisionComment;
  onlyShowed: boolean;
  count: number;
}
