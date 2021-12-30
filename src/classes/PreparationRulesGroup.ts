import PreparationRule from '@/classes/PreparationRule';
import IPreparationRule from '@/interfaces/IPreparationRule';
import IPreparationRulesGroup from '@/interfaces/IPreparationRulesGroup';

export default class PreparationRulesGroup implements IPreparationRulesGroup {
  id?: string;
  name = '';

  preparationRules: IPreparationRule[] = [];
  preparationRulesForDelete: string[] = [];

  constructor(i?: IPreparationRulesGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    if (i.preparationRules) {
      this.preparationRules = i.preparationRules.map((item: IPreparationRule) => new PreparationRule(item));
    }
  }

  addRule(): void {
    this.preparationRules.push(new PreparationRule());
  }

  removeRule(index: number): void {
    const idForDelete = this.preparationRules[index].id;
    if (idForDelete) {
      this.preparationRulesForDelete.push(idForDelete);
    }
    this.preparationRules.splice(index, 1);
  }
}
