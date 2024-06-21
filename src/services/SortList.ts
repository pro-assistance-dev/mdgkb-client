import createSortModels from '@/services/CreateSortModels';
import { SortModelBuildersLib } from '@/services/interfaces/Sort';

import SortModel from './classes/SortModel';

class SortListC {
  private list: SortModel[] = [];
  private defaultSortModel: SortModel | undefined;

  Set(sortLib?: SortModelBuildersLib): void {
    if (!sortLib) {
      return;
    }
    this.list = createSortModels(sortLib);
    this.setDefaultSortModel();
  }

  private setDefaultSortModel() {
    this.defaultSortModel = this.list.find((s: SortModel) => s.default);
  }

  Get(): SortModel[] {
    return this.list;
  }

  GetDefault(): SortModel | undefined {
    return this.defaultSortModel;
  }
}

const SortList = new SortListC();
export default SortList;
