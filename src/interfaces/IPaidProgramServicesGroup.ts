import IPaidProgramService from '@/interfaces/IPaidProgramService';

export default interface IPaidProgramServicesGroup {
  id?: string;
  name: string;
  order: number;
  paidProgramPackageId?: string;
  home: boolean;
  paidProgramServices: IPaidProgramService[];
  paidProgramServicesForDelete: string[];

  addPaidProgramService: () => void;
  removePaidProgramService: (index: number) => void;
}
