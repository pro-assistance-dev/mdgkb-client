import IPreparationTag from '@/interfaces/IPreparationTag';

export default class PreparationTag implements IPreparationTag {
  id?: string;
  name = '';

  constructor(i?: IPreparationTag) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
  }
}
