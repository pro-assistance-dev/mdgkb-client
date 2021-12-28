import { v4 as uuidv4 } from 'uuid';

import PaidProgramOptionsGroup from '@/classes/PaidProgramOptionsGroup';
import PaidProgramPackage from '@/classes/PaidProgramPackage';
import PaidProgramServicesGroup from '@/classes/PaidProgramServicesGroup';
import PaidProgramsGroup from '@/classes/PaidProgramsGroup';
import IPaidProgram from '@/interfaces/IPaidProgram';
import IPaidProgramOption from '@/interfaces/IPaidProgramOption';
import IPaidProgramOptionsGroup from '@/interfaces/IPaidProgramOptionsGroup';
import IPaidProgramPackage from '@/interfaces/IPaidProgramPackage';
import IPaidProgramPackageOption from '@/interfaces/IPaidProgramPackageOption';
import IPaidProgramService from '@/interfaces/IPaidProgramService';
import IPaidProgramServicesGroup from '@/interfaces/IPaidProgramServicesGroup';
import IPaidProgramsGroup from '@/interfaces/IPaidProgramsGroupsForServer';

export default class PaidProgram implements IPaidProgram {
  id?: string;
  name = '';
  description = '';
  paidProgramsGroupId?: string;
  paidProgramsGroup?: IPaidProgramsGroup;
  paidProgramPackages: IPaidProgramPackage[] = [];
  paidProgramPackagesForDelete: string[] = [];

  paidProgramOptionsGroups: IPaidProgramOptionsGroup[] = [];
  paidProgramOptionsForDelete: string[] = [];

  constructor(i?: IPaidProgram) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.description = i.description;
    this.paidProgramsGroupId = i.paidProgramsGroupId;
    if (i.paidProgramPackages) {
      this.paidProgramPackages = i.paidProgramPackages.map((item: IPaidProgramPackage) => new PaidProgramPackage(item));
    }
    if (i.paidProgramOptionsGroups) {
      this.paidProgramOptionsGroups = i.paidProgramOptionsGroups.map((item: IPaidProgramOptionsGroup) => new PaidProgramOptionsGroup(item));
    }
    if (i.paidProgramsGroup) {
      this.paidProgramsGroup = new PaidProgramsGroup(i.paidProgramsGroup);
    }
  }

  recreateAllPackages(): void {
    this.paidProgramPackages.forEach((paidPackage: IPaidProgramPackage) => this.paidProgramPackagesForDelete.push(paidPackage.id ?? ''));
    this.paidProgramPackages = [];
    this.createPackages();
  }

  addOptionsGroup(): void {
    this.paidProgramOptionsGroups.push(new PaidProgramOptionsGroup());
  }

  removeOptionsGroup(index: number): void {
    const idForDelete = this.paidProgramOptionsGroups[index].id;
    if (idForDelete) {
      this.paidProgramOptionsForDelete.push(idForDelete);
    }
    this.paidProgramOptionsGroups.splice(index, 1);
  }

  addPackage(): void {
    const pack = new PaidProgramPackage();
    const options: IPaidProgramOption[] = [];
    this.paidProgramOptionsGroups.forEach((optionGroup: IPaidProgramOptionsGroup) => {
      optionGroup.paidProgramOptions.forEach((option: IPaidProgramOption) => {
        if (option.selected) {
          options.push(option);
        }
      });
    });
    pack.id = uuidv4();
    this.paidProgramPackages.push(PaidProgramPackage.createFromOptions(options));
  }

  removePackage(index: number): void {
    const idForDelete = this.paidProgramPackages[index].id;
    if (idForDelete) {
      this.paidProgramPackagesForDelete.push(idForDelete);
    }
    this.paidProgramPackages.splice(index, 1);
  }

  getPackageOptions(paidProgramPackagesOptions: IPaidProgramPackageOption[]): string[] {
    return paidProgramPackagesOptions.map((optionPackage: IPaidProgramPackageOption) => {
      let name = '';
      this.paidProgramOptionsGroups.forEach((group: IPaidProgramOptionsGroup) => {
        const option = group.paidProgramOptions.find((opt) => opt.id === optionPackage.paidProgramOptionId);
        if (option) {
          name = option.name;
        }
      });
      return name;
    });
  }

  private createPackages(): void {
    const flatOptions = this.getOptions();
    if (flatOptions.length === 0) {
      return;
    }
    const optionsForPackages = this.combine(...flatOptions);
    this.paidProgramPackages = PaidProgramPackage.CreateFromOptions(optionsForPackages);
  }

  getOptions(): IPaidProgramOption[][] {
    return this.paidProgramOptionsGroups.map((optionGroup: IPaidProgramOptionsGroup) => {
      return optionGroup.paidProgramOptions.map((option: IPaidProgramOption) => {
        return option ?? '';
      });
    });
  }

  private combine(...options: IPaidProgramOption[][]): any {
    return options.reduce((a: IPaidProgramOption[], b: any) => {
      return a.flatMap((d: any) => b.map((e: any) => [d, e].flat()));
    });
  }

  selectOption(selectedOption: IPaidProgramOption): void {
    const optionsGroup = this.paidProgramOptionsGroups.find(
      (group: IPaidProgramOptionsGroup) => group.id === selectedOption.paidProgramOptionsGroupId
    );
    if (!optionsGroup) {
      return;
    }
    const option = optionsGroup.paidProgramOptions.find((paidOption: IPaidProgramOption) => paidOption.selected);
    if (option) {
      option.selected = false;
    }
    selectedOption.selected = true;
    this.setOptionsAvailability(selectedOption);
  }

  getSelectedPackage(): IPaidProgramPackage {
    const selectedOptions: string[] = [];
    this.paidProgramOptionsGroups.forEach((group: IPaidProgramOptionsGroup) => {
      const option = group.paidProgramOptions.find((opt: IPaidProgramOption) => opt.selected);
      if (option && option.id) {
        selectedOptions.push(option.id);
      }
    });
    const paidProgramPackage = this.paidProgramPackages.find((paidPack: IPaidProgramPackage) =>
      paidPack.identifyByOptions(selectedOptions)
    );
    return paidProgramPackage ?? new PaidProgramPackage();
  }

  private setOptionsAvailability(selectedOption: IPaidProgramOption): void {
    this.paidProgramOptionsGroups.forEach((group: IPaidProgramOptionsGroup) => {
      group.paidProgramOptions.forEach((opt: IPaidProgramOption) => {
        if (opt.paidProgramOptionsGroupId !== selectedOption.paidProgramOptionsGroupId) {
          opt.available = this.isPackageWithThisOption(opt.id, selectedOption.id);
        }
      });
    });
  }

  private isPackageWithThisOption(optId: string | undefined, selectedOptionId: string | undefined): boolean {
    return this.paidProgramPackages.some((programPackage: IPaidProgramPackage) => {
      const optionOne = programPackage.paidProgramPackagesOptions.find(
        (opt: IPaidProgramPackageOption) => opt.paidProgramOptionId === optId
      );
      const optionTwo = programPackage.paidProgramPackagesOptions.find(
        (opt: IPaidProgramPackageOption) => opt.paidProgramOptionId === selectedOptionId
      );
      return optionOne && optionTwo;
    });
  }

  addGroupToAllPackages(group: IPaidProgramServicesGroup, fromPackageIndex: number): void {
    group.id = undefined;
    group.paidProgramServices.forEach((service: IPaidProgramService) => (service.id = undefined));
    this.paidProgramPackages.forEach((programPackage: IPaidProgramPackage, i: number) => {
      if (i !== fromPackageIndex) {
        programPackage.paidProgramServicesGroups.push(new PaidProgramServicesGroup(group));
      }
    });
  }
}
