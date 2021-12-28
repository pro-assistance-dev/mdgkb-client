import IPaidProgramPackageOption from '@/interfaces/IPaidProgramPackageOption';
import IPaidProgramServicesGroup from '@/interfaces/IPaidProgramServicesGroup';

export default interface IPaidProgramPackage {
  id?: string;
  name: string;
  description: string;
  price: number;

  paidProgramId?: string;
  paidProgramServicesGroups: IPaidProgramServicesGroup[];
  paidProgramServicesGroupsForDelete: string[];

  paidProgramPackagesOptions: IPaidProgramPackageOption[];

  addServicesGroup: () => void;
  removeServicesGroup: (index: number) => void;

  identifyByOptions: (optionsId: string[]) => boolean;
}
