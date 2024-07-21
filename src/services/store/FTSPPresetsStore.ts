import BaseStore from '@/services/BaseStore';
import FTSPPreset from '@/services/classes/FTSPPreset';

class S extends BaseStore<FTSPPreset> {
  constructor() {
    super(FTSPPreset, 'ftsp-presets');
  }
}

const store: S = new S();
export default store;
