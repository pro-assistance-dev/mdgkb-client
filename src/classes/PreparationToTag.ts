import IPreparationToTag from '@/interfaces/IPreparationToTag';

export default class PreparationToTag implements IPreparationToTag {
  id?: string;
  preparationId?: string;
  preparationTagId?: string;

  constructor(i?: IPreparationToTag) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.preparationId = i.preparationId;
    this.preparationTagId = i.preparationTagId;
  }
}
