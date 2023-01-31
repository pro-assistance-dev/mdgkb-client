import { v4 as uuidv4 } from 'uuid';

import PaidProgramPackageOption from '@/classes/PaidProgramPackageOption';
import PaidProgramServicesGroup from '@/classes/PaidProgramServicesGroup';
import IPaidProgramOption from '@/interfaces/IPaidProgramOption';
import IPaidProgramPackage from '@/interfaces/IPaidProgramPackage';
import IPaidProgramPackageOption from '@/interfaces/IPaidProgramPackageOption';
import IPaidProgramServicesGroup from '@/interfaces/IPaidProgramServicesGroup';

export default class PaidProgramPackage implements IPaidProgramPackage {
  id?: string;
  name = '';
  price = 0;
  description = '';
  paidProgramId?: string;
  paidProgramServicesGroups: IPaidProgramServicesGroup[] = [];
  paidProgramServicesGroupsForDelete: string[] = [];
  paidProgramPackagesOptions: IPaidProgramPackageOption[] = [];

  constructor(i?: IPaidProgramPackage) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.price = i.price;
    this.description = i.description;
    this.paidProgramId = i.paidProgramId;
    if (i.paidProgramServicesGroups) {
      this.paidProgramServicesGroups = i.paidProgramServicesGroups.map(
        (item: IPaidProgramServicesGroup) => new PaidProgramServicesGroup(item)
      );
    }
    if (i.paidProgramPackagesOptions) {
      this.paidProgramPackagesOptions = i.paidProgramPackagesOptions.map(
        (item: IPaidProgramPackageOption) => new PaidProgramPackageOption(item)
      );
    }
  }

  static CreateFromOptions(options: IPaidProgramOption[][]): PaidProgramPackage[] {
    return options.map((o: IPaidProgramOption[]) => PaidProgramPackage.createFromOptions(o));
  }

  static createFromOptions(options: IPaidProgramOption[]): PaidProgramPackage {
    const paidPackage = new PaidProgramPackage();
    paidPackage.paidProgramPackagesOptions = options.map((option: IPaidProgramOption) => {
      const packageOption = new PaidProgramPackageOption();
      packageOption.paidProgramOptionId = option.id;
      return packageOption;
    });
    paidPackage.id = uuidv4();
    paidPackage.name = options.reduce((accumulator: string, currentValue: IPaidProgramOption) => {
      return accumulator + ' + ' + currentValue.name;
    }, '');
    return paidPackage;
  }

  addServicesGroup(): void {
    const group = new PaidProgramServicesGroup();
    group.name = 'Новая группа';
    this.paidProgramServicesGroups.push(group);
  }

  removeServicesGroup(index: number): void {
    const idForDelete = this.paidProgramServicesGroups[index].id;
    if (idForDelete) {
      this.paidProgramServicesGroupsForDelete.push(idForDelete);
    }
    this.paidProgramServicesGroups.splice(index, 1);
  }

  identifyByOptions(optionsId: string[]): boolean {
    let is = true;
    optionsId.forEach((optionId: string) => {
      if (is) {
        const optionFinded = this.paidProgramPackagesOptions.some(
          (packOpt: IPaidProgramPackageOption) => packOpt.paidProgramOptionId === optionId
        );
        if (!optionFinded) {
          is = false;
        }
      }
    });
    return is;
  }
}
