import IDivision from '@/interfaces/IDivision';

export default interface IDepartment {
  id?: string;
  name: string;
  headId?: string;
  isDivision: boolean;
  divisionId?: string;
  division?: IDivision;
}
