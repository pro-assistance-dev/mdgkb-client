import PaidProgramService from '@/classes/PaidProgramService';
import IPaidProgramService from '@/interfaces/IPaidProgramService';
import IPaidProgramServicesGroup from '@/interfaces/IPaidProgramServicesGroup';

export default class PaidProgramServicesGroup implements IPaidProgramServicesGroup {
  id?: string;
  name = '';
  home = false;
  order = 0;
  paidProgramPackageId?: string;
  paidProgramServices: IPaidProgramService[] = [];
  paidProgramServicesForDelete: string[] = [];

  constructor(i?: IPaidProgramServicesGroup) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.home = i.home;
    this.order = i.order;
    this.paidProgramPackageId = i.paidProgramPackageId;
    if (i.paidProgramServices) {
      this.paidProgramServices = i.paidProgramServices.map((item: IPaidProgramService) => new PaidProgramService(item));
    }
  }

  addPaidProgramService(): void {
    this.paidProgramServices.push(new PaidProgramService());
  }

  removePaidProgramService(index: number): void {
    const idForDelete = this.paidProgramServices[index].id;
    if (idForDelete) {
      this.paidProgramServicesForDelete.push(idForDelete);
    }
    this.paidProgramServices.splice(index, 1);
  }

  sortServices(evt: any): void {
    this.paidProgramServices.forEach((service: IPaidProgramService, i: number) => (service.order = i));
  }
}
