import DonorRule from '@/classes/DonorRule';
import FileInfo from '@/classes/FileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class DonorRulesWithDeleted {
  id?: string;
  donorRules: DonorRule[] = [];
  donorRulesForDelete: string[] = [];

  constructor(i?: DonorRulesWithDeleted) {
    ClassHelper.BuildClass(this, i);
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

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    this.donorRules.forEach((rule: DonorRule) => fileInfos.push(...rule.getFileInfos()));
    return fileInfos;
  }
}
