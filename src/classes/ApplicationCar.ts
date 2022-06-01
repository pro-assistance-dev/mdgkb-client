import Division from '@/classes/buildings/Division';
import Gate from '@/classes/Gate';
import IDivision from '@/interfaces/buildings/IDivision';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IApplicationCar from '@/interfaces/IApplicationCar';
import IGate from '@/interfaces/IGate';

import Form from './Form';

export default class ApplicationCar implements IApplicationCar {
  id?: string;
  division?: IDivision;
  divisionId?: string;
  gate?: IGate;
  gateId?: string;

  formValue = new Form();
  formValueId?: string;

  constructor(i?: IApplicationCar) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.divisionId = i.divisionId;
    this.gateId = i.gateId;
    this.formValueId = i.formValueId;
    if (i.division) {
      this.division = new Division(i.division);
    }
    if (i.gate) {
      this.gate = new Gate(i.gate);
    }
    if (i.formValue) {
      this.formValue = new Form(i.formValue);
    }
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFieldValuesFileInfos();
  }
}
