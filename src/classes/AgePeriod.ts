import IAgePeriod from '@/interfaces/IAgePeriod';

export default class AgePeriod implements IAgePeriod {
  id?: string;
  name = '';

  constructor(i?: IAgePeriod) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
  }
}
