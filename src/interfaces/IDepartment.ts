import Division from '@/classes/Division';

export default interface IDepartment {
  id?: string;
  name: string;
  headId?: string;
  isDivision: boolean;
  divisionId?: string;
  division?: Division;
}
