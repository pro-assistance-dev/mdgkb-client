import IFileInfo from '@/interfaces/files/IFileInfo';
import IDonorRule from '@/interfaces/IDonorRule';

export default interface IDonorRulesWithDeleted {
  donorRules: IDonorRule[];
  donorRulesForDelete: string[];
  addDonorRule: () => void;
  removeDonorRule: (index: number) => void;

  getFileInfos: () => IFileInfo[];
}
