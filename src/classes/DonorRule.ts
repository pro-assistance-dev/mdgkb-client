import { v4 as uuidv4 } from 'uuid';

import DonorRuleUser from '@/classes/DonorRuleUser';
import FileInfo from '@/classes/File/FileInfo';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRuleUser from '@/interfaces/IDonorRuleUser';

export default class DonorRule implements IDonorRule {
  id?: string;
  name = '';
  order = 0;
  image = new FileInfo();
  imageId?: string;
  donorRulesUsers: IDonorRuleUser[] = [];

  constructor(i?: IDonorRule) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.order = i.order;

    if (i.image) {
      this.image = new FileInfo(i.image);
    }
    this.imageId = i.imageId;
    if (i.donorRulesUsers) {
      this.donorRulesUsers = i.donorRulesUsers.map((item: IDonorRuleUser) => new DonorRuleUser(item));
    }
  }

  addFile(file: IElementPlusFile): void {
    if (!this.image.id) {
      this.image.id = uuidv4();
    }
    this.image.originalName = file.name;
    this.image.file = file.raw;
  }

  getFileInfos(): IFileInfo[] {
    this.image.url = '';
    return [this.image];
  }

  isFavourite(): boolean {
    return this.donorRulesUsers.length > 0;
  }

  addFavourite(userId: string): void {
    const donorRuleUser = new DonorRuleUser();
    donorRuleUser.donorRuleId = this.id;
    donorRuleUser.userId = userId;
    this.donorRulesUsers.push(donorRuleUser);
  }

  removeFavourite(): void {
    this.donorRulesUsers = [];
  }
}
