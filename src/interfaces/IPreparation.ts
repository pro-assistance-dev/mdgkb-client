import IPreparationRulesGroup from '@/interfaces/IPreparationRulesGroup';

export default interface IPreparation {
  id?: string;
  name: string;
  editMode: boolean;
  selected: boolean;

  preparationRulesGroups: IPreparationRulesGroup[];
  preparationRulesGroupsForDelete: string[];

  addRulesGroup: () => void;
  removeRulesGroup: (index: number) => void;
}
