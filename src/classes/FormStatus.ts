import IFileInfo from '@/interfaces/files/IFileInfo';
import IFormStatus from '@/interfaces/IFormStatus';
import IFormStatusToFormStatus from '@/interfaces/IFormStatusToFormStatus';

import FileInfo from './File/FileInfo';
import FormStatusToFormStatus from './FormStatusToFormStatus';

export default class FormStatus implements IFormStatus {
  id?: string;
  name = '';
  label = '';
  color = '';
  modActionName = '';
  userActionName = '';
  isEditable = false;
  formStatusToFormStatuses: IFormStatusToFormStatus[] = [];
  formStatusToFormStatusesForDelete: string[] = [];

  icon = new FileInfo();
  iconId?: string;

  constructor(formStatus?: IFormStatus) {
    if (!formStatus) {
      return;
    }
    this.id = formStatus.id;
    this.name = formStatus.name;
    this.label = formStatus.label;
    this.color = formStatus.color;
    this.modActionName = formStatus.modActionName;
    this.userActionName = formStatus.userActionName;
    this.isEditable = formStatus.isEditable;
    if (formStatus.formStatusToFormStatuses) {
      this.formStatusToFormStatuses = formStatus.formStatusToFormStatuses.map(
        (item: IFormStatusToFormStatus) => new FormStatusToFormStatus(item)
      );
    }
    if (formStatus.icon) {
      this.icon = new FileInfo(formStatus.icon);
    }
    this.iconId = formStatus.iconId;
  }

  isNew(): boolean {
    return this.label.toLocaleLowerCase() === 'новое';
  }

  isSpecify(): boolean {
    return this.label.toLocaleLowerCase() === 'уточнено';
  }

  isEnlisted(): boolean {
    return this.label.toLocaleLowerCase() === 'зачислено';
  }

  isConsidering(): boolean {
    return this.label.toLocaleLowerCase() === 'принято к рассмотрению';
  }

  isSpecifyRequired(): boolean {
    return this.label.toLocaleLowerCase() === 'требует уточнения';
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    fileInfos.push(this.icon);
    return fileInfos;
  }

  removeFormStatusToFormStatuses(item: IFormStatusToFormStatus): void {
    console.log('item.id ==>', item.id);
    if (!item.id) return;
    this.formStatusToFormStatusesForDelete.push(item.id);
  }
}
