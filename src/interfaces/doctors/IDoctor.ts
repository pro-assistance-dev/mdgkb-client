import IDivision from '@/interfaces/buildings/IDivision';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/IHuman';

export default interface IDoctor {
  id?: string;
  human?: IHuman;
  humanId?: string;
  division?: IDivision;
  divisionId?: string;
  education?: string;
  schedule?: string;
  position?: string;
  tags?: string;
  fileInfoId?: string;
  fileInfo: IFileInfo;
}
