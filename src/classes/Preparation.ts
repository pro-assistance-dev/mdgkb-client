import PreparationRulesGroup from '@/classes/PreparationRulesGroup';
import ClassHelper from '@/services/ClassHelper';

export default class Preparation {
  id?: string;
  name = '';
  @ClassHelper.GetClassConstructor(PreparationRulesGroup)
  preparationRulesGroups: PreparationRulesGroup[] = [];
  preparationRulesGroupsForDelete: string[] = [];
  laboratory = false;
  oms = true;
  dms = true;

  constructor(i?: Preparation) {
    ClassHelper.BuildClass(this, i);
  }

  private static instrumentalPreparationsNames: string[] = [
    'Диеты',
    'Лекарственные препараты',
    'Прочее',
    'Специальные правила подготовки и дополнительные ограничения для ряда тестов в дополнение к общим рекомендациям',
    'Противопоказания к исследованиям',
  ];

  private static laboratoryPreparationsNames: string[] = [
    'Рекомендации для взятия/сбора и сдачи',
    'Условия хранения биоматериала дома и доставки в лабораторию',
  ];

  static CreatePreparation(laboratory: boolean): Preparation {
    const item = new Preparation();
    item.oms = true;
    item.dms = true;
    this.instrumentalPreparationsNames.forEach((name: string, i: number) => {
      item.preparationRulesGroups.push(PreparationRulesGroup.Fabric(name, i));
    });
    if (laboratory) {
      this.laboratoryPreparationsNames.forEach((name: string, i: number) => {
        item.preparationRulesGroups.push(PreparationRulesGroup.Fabric(name, i + item.preparationRulesGroups.length));
      });
    }
    return item;
  }

  static GetClassName(): string {
    return 'preparation';
  }
}
