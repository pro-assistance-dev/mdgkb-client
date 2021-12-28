import IPaidProgramPackageOption from '@/interfaces/IPaidProgramPackageOption';

export default class PaidProgramPackageOption implements IPaidProgramPackageOption {
  id?: string;
  paidProgramOptionId?: string;
  paidProgramPackageId?: string;

  constructor(i?: IPaidProgramPackageOption) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.paidProgramOptionId = i.paidProgramOptionId;
    this.paidProgramPackageId = i.paidProgramPackageId;
  }
}
