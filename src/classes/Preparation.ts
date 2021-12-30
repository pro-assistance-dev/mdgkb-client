import PreparationRulesGroup from '@/classes/PreparationRulesGroup';
import IPreparation from '@/interfaces/IPreparation';
import IPreparationRulesGroup from '@/interfaces/IPreparationRulesGroup';

export default class Preparation implements IPreparation {
  id?: string;
  name = '';
  editMode = false;
  selected = false;
  preparationRulesGroups: IPreparationRulesGroup[] = [];
  preparationRulesGroupsForDelete: string[] = [];

  constructor(i?: IPreparation) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;

    if (i.preparationRulesGroups) {
      this.preparationRulesGroups = i.preparationRulesGroups.map((item: IPreparationRulesGroup) => new PreparationRulesGroup(item));
    }
  }

  addRulesGroup(): void {
    this.preparationRulesGroups.push(new PreparationRulesGroup());
  }

  removeRulesGroup(index: number): void {
    const idForDelete = this.preparationRulesGroups[index].id;
    if (idForDelete) {
      this.preparationRulesGroupsForDelete.push(idForDelete);
    }
    this.preparationRulesGroups.splice(index, 1);
  }
}
