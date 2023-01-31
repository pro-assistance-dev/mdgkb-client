import PaidProgramServicesGroup from '@/classes/PaidProgramServicesGroup';
import IPaidProgramServicesGroup from '@/interfaces/IPaidProgramServicesGroup';

export default class PaidProgramLevel {
  id?: string;
  name = '';
  yearProgramGroupId?: string;
  yearsProgramServicesGroups: IPaidProgramServicesGroup[] = [];

  constructor(i?: PaidProgramLevel) {
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
