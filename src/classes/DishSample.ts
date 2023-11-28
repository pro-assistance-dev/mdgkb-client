import FileInfo from '@/classes/FileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class DishSample {
  id?: string;
  name = '';
  price = 0;
  order = 0;
  weight = 0;
  caloric = 0;
  quantity = 0;
  additionalWeight = 0;
  dishesGroupId?: string;
  selected = false;
  image: FileInfo = new FileInfo();
  imageId?: string;
  updatedAt?: Date = new Date();
  proteins = 0;
  fats = 0;
  carbohydrates = 0;
  dietary = false;
  lean = false;
  composition = '';
  description = '';

  constructor(i?: DishSample) {
    ClassHelper.BuildClass(this, i);
  }

  removeImage(): void {
    this.image = new FileInfo();
    this.imageId = undefined;
  }

  getFileInfos(): FileInfo[] {
    return [this.image];
  }
}
