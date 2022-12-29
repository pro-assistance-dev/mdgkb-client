import IFileInfo from '@/interfaces/files/IFileInfo';
import IDishesGroup from '@/interfaces/IDishesGroup';

export default interface IDishSample {
  id?: string;
  name: string;
  price: number;
  order: number;
  weight: number;
  caloric: number;
  dishesGroupId?: string;
  dishesGroup: IDishesGroup;
  selected: boolean;

  image: IFileInfo;
  imageId?: string;
  removeImage: () => void;
  getFileInfos: () => IFileInfo[];
}
