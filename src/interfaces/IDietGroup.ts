import IDiet from '@/interfaces/IDiet';

export default interface IDietGroup {
  id?: string;
  name: string;
  diets: IDiet[];
}
