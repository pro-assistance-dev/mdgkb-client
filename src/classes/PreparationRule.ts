import IPreparationRule from '@/interfaces/IPreparationRule';

export default class PreparationRule implements IPreparationRule {
  id?: string;
  name = '';
  time = '';

  constructor(i?: IPreparationRule) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.time = i.time;
  }
}
