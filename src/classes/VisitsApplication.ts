import Division from '@/classes/Division';
import Gate from '@/classes/Gate';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDivision from '@/interfaces/IDivision';
import IGate from '@/interfaces/IGate';
import IVisit from '@/interfaces/IVisit';
import IVisitsApplication from '@/interfaces/IVisitsApplication';
import ClassHelper from '@/services/ClassHelper';

import Form from './Form';
import Visit from './Visit';

export default class VisitsApplication {
  id?: string;
  division: IDivision = new Division();
  divisionId?: string;
  gate?: IGate;
  gateId?: string;
  withCar = false;

  formValue = new Form();
  formValueId?: string;

  @ClassHelper.GetClassConstructorForArray(Visit)
  visits: IVisit[] = [];
  visitsForDelete: string[] = [];

  constructor(i?: VisitsApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFileInfos();
  }

  addVisit(): void {
    this.visits.push(new Visit());
  }

  removeVisit(index: number): void {
    const idForDelete = this.visits[index].id;
    if (idForDelete) {
      this.visitsForDelete.push(idForDelete);
    }
    this.visits.splice(index, 1);
  }

  changeWithCar(value: boolean): void {
    this.withCar = value;
  }
}
