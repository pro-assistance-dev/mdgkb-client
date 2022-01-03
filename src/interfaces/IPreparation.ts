import IPreparationRulesGroup from '@/interfaces/IPreparationRulesGroup';
import IPreparationToTag from '@/interfaces/IPreparationToTag';

export default interface IPreparation {
  id?: string;
  name: string;
  editMode: boolean;
  selected: boolean;

  preparationRulesGroups: IPreparationRulesGroup[];
  preparationRulesGroupsForDelete: string[];

  preparationsToTags: IPreparationToTag[];
  preparationsToTagsForDelete: string[];

  addRulesGroup: () => void;
  removeRulesGroup: (index: number) => void;

  addTag: (add: boolean, id: string) => void;
  findTag: (tagId: string) => boolean;
}
