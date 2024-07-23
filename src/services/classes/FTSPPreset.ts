import { FTSP } from '@/Main';
import ClassHelper from '@/services/ClassHelper';

export default class FTSPPreset {
  id?: string;
  ftsp?: string;
  name = '';
  constructor(i?: FTSPPreset) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(ftsp: FTSP): FTSPPreset {
    const item = new FTSPPreset();
    item.id = ClassHelper.CreateUUID();
    item.ftsp = JSON.stringify(ftsp);
    return item;
  }
}
