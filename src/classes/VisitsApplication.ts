import Division from '@/classes/Division';
import Form from '@/classes/Form';
import Gate from '@/classes/Gate';
import Visit from '@/classes/Visit';
import FileInfo from '@/services/classes/FileInfo.ts';
import ClassHelper from '@/services/ClassHelper';

export default class VisitsApplication {
  id?: string;
  division: Division = new Division();
  divisionId?: string;
  gate?: Gate;
  gateId?: string;
  withCar = false;

  formValue = new Form();
  formValueId?: string;

  @ClassHelper.GetClassConstructor(Visit)
  visits: Visit[] = [];
  visitsForDelete: string[] = [];
  //

  createdAt = '';
  childFullName = '';
  fullName = '';
  email = '';
  formStatusId = '';
  gateName = '';
  divisionName = '';
  constructor(i?: VisitsApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): FileInfo[] {
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

  static GetClassName(): string {
    return 'visitsApplication';
  }
}
