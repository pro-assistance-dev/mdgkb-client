import IPaidProgram from '@/interfaces/IPaidProgram';
import IPaidProgramService from '@/interfaces/IPaidProgramService';

export default interface IPaidProgramsGroup {
  id?: string;
  name: string;
  paidPrograms: IPaidProgram[];
  paidProgramsForDelete: string[];
  paidProgramsServices: IPaidProgramService[];

  addPaidProgram: () => void;
  removePaidProgram: (index: number) => void;
}
