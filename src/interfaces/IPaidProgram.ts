import IPaidProgramOption from '@/interfaces/IPaidProgramOption';
import IPaidProgramOptionsGroup from '@/interfaces/IPaidProgramOptionsGroup';
import IPaidProgramPackage from '@/interfaces/IPaidProgramPackage';
import IPaidProgramServicesGroup from '@/interfaces/IPaidProgramServicesGroup';
import IPaidProgramsGroup from '@/interfaces/IPaidProgramsGroupsForServer';

export default interface IPaidProgram {
  id?: string;
  name: string;
  description: string;

  paidProgramsGroupId?: string;
  paidProgramsGroup?: IPaidProgramsGroup;

  paidProgramPackages: IPaidProgramPackage[];
  paidProgramPackagesForDelete: string[];

  paidProgramOptionsGroups: IPaidProgramOptionsGroup[];
  paidProgramOptionsForDelete: string[];

  addOptionsGroup: () => void;
  removeOptionsGroup: (index: number) => void;

  selectOption: (option: IPaidProgramOption) => void;
  getSelectedPackage: () => IPaidProgramPackage;

  addGroupToAllPackages: (group: IPaidProgramServicesGroup, fromPackageIndex: number) => void;
  recreateAllPackages: () => void;

  addPackage: () => void;
  removePackage: (index: number) => void;
}
