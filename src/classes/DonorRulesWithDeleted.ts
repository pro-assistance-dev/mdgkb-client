import DonorRule from '@/classes/DonorRule';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDonorRule from '@/interfaces/IDonorRule';
import IDonorRulesWithDeleted from '@/interfaces/IDonorRulesWithDeleted';

export default class DonorRulesWithDeleted implements IDonorRulesWithDeleted {
  id?: string;
  donorRules: IDonorRule[] = [];
  donorRulesForDelete: string[] = [];

  constructor(i?: IDonorRulesWithDeleted) {
    if (!i) {
      return;
    }
    if (i.donorRules) {
      this.donorRules = i.donorRules.map((item: IDonorRule) => new DonorRule(item));
    }
  }

  addDonorRule(): void {
    this.donorRules.push(new DonorRule());
  }

  removeDonorRule(index: number): void {
    const idForDelete = this.donorRules[index].id;
    if (idForDelete) {
      this.donorRulesForDelete.push(idForDelete);
    }
    this.donorRules.splice(index, 1);
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.donorRules.forEach((rule: IDonorRule) => fileInfos.push(...rule.getFileInfos()));
    return fileInfos;
  }
}
