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
    console.log(this.list);

    this.setDefaultSortModel();
  }

  private setDefaultSortModel() {
    this.defaultSortModel = this.list.find((s: SortModel) => s.default) ?? this.list[0];
  }

  Get(): SortModel[] {
    console.log(this.list);
    return this.list;
  }

  GetDefault(): SortModel | undefined {
    return this.defaultSortModel;
  }
}

const SortList = new SortListC();
export default SortList;
