import IHuman from '@/interfaces/IHuman';
import IDivision from '@/interfaces/buildings/IDivision';

export default interface IDoctor {
  id?: string;
  human?: IHuman;
  humanId?: string;
  division?: IDivision;
  divisionId?: string;
  education?: string;
  schedule?: string;
  tags?: string;
}
