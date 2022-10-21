import IDietAge from '@/interfaces/IDietAge';
import IDietGroup from '@/interfaces/IDietGroup';

export default interface IDiet {
  id?: string;
  name: string;
  shortName?: string;
  siteName: string;
  diabetes: boolean;
  dietAges: IDietAge[];
  dietGroupId?: string;
  dietGroup: IDietGroup;
}
