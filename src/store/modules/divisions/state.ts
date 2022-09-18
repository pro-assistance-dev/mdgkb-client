import IFilesList from '@/interfaces/files/IFIlesList';
import IDivision from '@/interfaces/IDivision';
import IDivisionComment from '@/interfaces/IDivisionComment';

export interface State {
  divisions: IDivision[];
  division: IDivision;
  galleryList: IFilesList[];
  curGalleryCropIndex: number;
  comment: IDivisionComment;
  onlyShowed: boolean;
  count: number;
}
