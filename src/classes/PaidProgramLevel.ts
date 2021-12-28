import PaidProgramServicesGroup from '@/classes/PaidProgramServicesGroup';
import IPaidProgramLevel from '@/interfaces/IPaidProgramLevel';
import IPaidProgramServicesGroup from '@/interfaces/IPaidProgramServicesGroup';

export default class PaidProgramLevel implements IPaidProgramLevel {
  id?: string;
  name = '';
  yearProgramGroupId?: string;
  yearsProgramServicesGroups: IPaidProgramServicesGroup[] = [];

  constructor(i?: IPaidProgramLevel) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.yearProgramGroupId = i.yearProgramGroupId;
    if (i.yearsProgramServicesGroups) {
      this.yearsProgramServicesGroups = i.yearsProgramServicesGroups.map(
        (item: IPaidProgramServicesGroup) => new PaidProgramServicesGroup(item)
      );
    }
  }
}
