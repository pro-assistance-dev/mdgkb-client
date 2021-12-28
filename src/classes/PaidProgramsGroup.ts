import PaidProgram from '@/classes/PaidProgram';
import PaidProgramService from '@/classes/PaidProgramService';
import IPaidProgram from '@/interfaces/IPaidProgram';
import IPaidProgramService from '@/interfaces/IPaidProgramService';
import IPaidProgramsGroup from '@/interfaces/IPaidProgramsGroupsForServer';

export default class PaidProgramsGroup implements IPaidProgramsGroup {
  id?: string;
  name = '';
  paidPrograms: IPaidProgram[] = [];
  paidProgramsForDelete: string[] = [];
  paidProgramsServices: IPaidProgramService[] = [];

  constructor(i?: IPaidProgramsGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    if (i.paidPrograms) {
      this.paidPrograms = i.paidPrograms.map((item: IPaidProgram) => new PaidProgram(item));
    }
    if (i.paidProgramsServices) {
      this.paidProgramsServices = i.paidProgramsServices.map((item: IPaidProgramService) => new PaidProgramService(item));
    }
  }

  addPaidProgram(): void {
    this.paidPrograms.push(new PaidProgram());
  }

  removePaidProgram(index: number): void {
    const idForDelete = this.paidPrograms[index].id;
    if (idForDelete) {
      this.paidProgramsForDelete.push(idForDelete);
    }
    this.paidPrograms.splice(index, 1);
  }
}
