import IPaidProgramOption from '@/interfaces/IPaidProgramOption';

export default interface IPaidProgramOptionsGroup {
  id?: string;
  name: string;
  paidProgramOptions: IPaidProgramOption[];
  paidProgramOptionsForDelete: string[];
  order: number;
  paidProgramId?: string;

  addOption: () => void;
  removeOption: (index: number) => void;
}
