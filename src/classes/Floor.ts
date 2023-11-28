import Division from '@/classes/Division';
import ClassHelper from '@/services/ClassHelper';

export default class Floor {
  id?: string;
  number?: number;
  buildingId?: string = '';
  @ClassHelper.GetClassConstructor(Division)
  divisions: Division[] = [];

  constructor(i?: Floor) {
    ClassHelper.BuildClass(this, i);
  }
}
