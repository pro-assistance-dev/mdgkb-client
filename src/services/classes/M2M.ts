import { RoleName } from '@/interfaces/RoleName';
import ClassHelper from '@/services/ClassHelper';

class KeyValue {
  field = '';
  value = '';
}

export default class M2M {
  model = '';
  id1: KeyValue = new KeyValue();
  id2: KeyValue = new KeyValue();
  fields: KeyValue[] = [];

  constructor(i?: M2M) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateV1(model: string, id1: KeyValue, id2: KeyValue): M2M {
    const item = new M2M();
    item.model = model;
    item.id1 = id1;
    item.id2 = id2;
    return item;
  }
}
