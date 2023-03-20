import PreparationRule from '@/classes/PreparationRule';
import ClassHelper from '@/services/ClassHelper';

export default class PreparationRulesGroup {
  id?: string;
  name = '';
  @ClassHelper.GetClassConstructor(PreparationRule)
  preparationRules: PreparationRule[] = [];
  preparationRulesForDelete: string[] = [];
  order = 0;

  constructor(i?: PreparationRulesGroup) {
    ClassHelper.BuildClass(this, i);
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

  static Fabric(name: string, order: number): PreparationRulesGroup {
    const item = new PreparationRulesGroup();
    item.name = name;
    item.order = order;
    return item;
  }
}
