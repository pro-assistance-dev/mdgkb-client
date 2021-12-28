import { v4 as uuidv4 } from 'uuid';

import PaidProgramOption from '@/classes/PaidProgramOption';
import IPaidProgramOption from '@/interfaces/IPaidProgramOption';
import IPaidProgramOptionsGroup from '@/interfaces/IPaidProgramOptionsGroup';

export default class PaidProgramOptionsGroup implements IPaidProgramOptionsGroup {
  id?: string;
  name = '';
  paidProgramOptions: IPaidProgramOption[] = [];
  paidProgramOptionsForDelete: string[] = [];
  paidProgramId?: string;
  order = 0;
  constructor(i?: IPaidProgramOptionsGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.paidProgramId = i.paidProgramId;
    this.order = i.order;
    if (i.paidProgramOptions) {
      this.paidProgramOptions = i.paidProgramOptions.map((item: IPaidProgramOption) => new PaidProgramOption(item));
    }
    const optionForDefault = this.paidProgramOptions.find((option: IPaidProgramOption) => option.available);
    if (optionForDefault) {
      optionForDefault.selected = true;
    }
  }

  addOption(): void {
    const filter = new PaidProgramOption();
    filter.id = uuidv4();
    this.paidProgramOptions.push(filter);
  }

  removeOption(index: number): void {
    const idForDelete = this.paidProgramOptions[index].id;
    if (idForDelete) {
      this.paidProgramOptionsForDelete.push(idForDelete);
    }
    this.paidProgramOptions.splice(index, 1);
  }
}
