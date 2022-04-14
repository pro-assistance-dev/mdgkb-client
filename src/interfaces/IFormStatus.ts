import IFileInfo from './files/IFileInfo';
import IFormStatusToFormStatus from './IFormStatusToFormStatus';

export default interface IFormStatus {
  id?: string;
  name: string;
  label: string;
  color: string;
  modActionName: string;
  userActionName: string;
  isEditable: boolean;
  formStatusToFormStatuses: IFormStatusToFormStatus[];
  formStatusToFormStatusesForDelete: string[];

  icon: IFileInfo;
  iconId?: string;

  isNew: () => boolean;
  isSpecify: () => boolean;
  isSpecifyRequired: () => boolean;
  isEnlisted: () => boolean;
  isConsidering: () => boolean;
  getFileInfos: () => IFileInfo[];
}
