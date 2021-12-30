import IPreparationRule from '@/interfaces/IPreparationRule';

export default interface IPreparationRulesGroup {
  id?: string;
  name: string;

  preparationRules: IPreparationRule[];
  preparationRulesForDelete: string[];

  addRule: () => void;
  removeRule: (index: number) => void;
}
