import DishesGroup from '@/classes/DishesGroup';
import FileInfo from '@/classes/File/FileInfo';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDishSample from '@/interfaces/IDishSample';

export default class DishSample implements IDishSample {
  id?: string;
  name = '';
  price = 0;
  order = 0;
  weight = 0;
  caloric = 0;
  quantity = 0;
  dishesGroupId?: string;
  dishesGroup = new DishesGroup();
  selected = false;
  image: IFileInfo = new FileInfo();
  imageId?: string;
  constructor(i?: IDishSample) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.weight = i.weight;
    this.price = i.price;
    this.caloric = i.caloric;
    this.quantity = i.quantity;
    this.order = i.order;
    this.dishesGroupId = i.dishesGroupId;
    if (i.dishesGroup) {
      this.dishesGroup = new DishesGroup(i.dishesGroup);
    }
    this.imageId = i.imageId;
    if (i.image) {
      this.image = new FileInfo(i.image);
    }
  }

  removeImage(): void {
    this.image = new FileInfo();
    this.imageId = undefined;
  }

  getFileInfos(): IFileInfo[] {
    return [this.image];
  }
}
