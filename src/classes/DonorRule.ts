import { v4 as uuidv4 } from 'uuid';

import DonorRuleUser from '@/classes/DonorRuleUser';
import FileInfo from '@/classes/FileInfo';
import IElementPlusFile from '@/interfaces/files/IElementPlusFile';
import ClassHelper from '@/services/ClassHelper';

export default class DonorRule {
  id?: string;
  name = '';
  order = 0;
  image = new FileInfo();
  imageId?: string;
  @ClassHelper.GetClassConstructor(DonorRuleUser)
  donorRulesUsers: DonorRuleUser[] = [];

  constructor(i?: DonorRule) {
    ClassHelper.BuildClass(this, i);
  }

  addFile(file: IElementPlusFile): void {
    if (!this.image.id) {
      this.image.id = uuidv4();
    }
    this.image.originalName = file.name;
    this.image.file = file.raw;
  }

  getFileInfos(): FileInfo[] {
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
