import createSortModels from '@/services/CreateSortModels';
import { SortModelBuildersLib } from '@/services/interfaces/Sort';

import SortModel from './classes/SortModel';

class SortListC {
  private list: SortModel[] = [];
  private defaultSortModel: SortModel | undefined;

  Set(sorts?: SortModelBuildersLib | SortModel[]): void {
    this.Reset();
    if (!sorts) {
      return;
    }
    if (Array.isArray(sorts)) {
      this.list = sorts;
    } else {
      this.list = createSortModels(sorts);
    }
    this.setDefaultSortModel();
  }

  private setDefaultSortModel() {
    this.defaultSortModel = this.list.find((s: SortModel) => s.default) ?? this.list[0];
  }

  Get(): SortModel[] {
    return this.list;
  }

  GetDefault(): SortModel | undefined {
    return this.defaultSortModel;
  }
  Reset(): void {
    this.list = [];
    this.defaultSortModel = undefined;
  }
}

const SortList = new SortListC();
export default SortList;
