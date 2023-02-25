import IFileInfo from '@/interfaces/files/IFileInfo';
import IFiler from '@/interfaces/files/IFiler';
import IDonorRuleUser from '@/interfaces/IDonorRuleUser';
import IOrdered from '@/services/interfaces/IOrdered';

export default interface IDonorRule extends IFiler, IOrdered {
  id?: string;
  name: string;
  image: IFileInfo;
  imageId?: string;
  getFileInfos: () => IFileInfo[];
  donorRulesUsers: IDonorRuleUser[];

  isFavourite: () => boolean;
  addFavourite: (userId: string) => void;
  removeFavourite: () => void;
}
