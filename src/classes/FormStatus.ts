import FileInfo from '@/services/classes/FileInfo';
import FormStatusToFormStatus from '@/classes/FormStatusToFormStatus';
import { FormStatusNames } from '@/interfaces/FormStatusNames';
import ClassHelper from '@/services/ClassHelper';

export default class FormStatus {
  id?: string;
  name = '';
  label = '';
  color = '';
  sendEmail = false;
  modActionName = '';
  userActionName = '';
  isEditable = false;
  @ClassHelper.GetClassConstructor(FormStatusToFormStatus)
  formStatusToFormStatuses: FormStatusToFormStatus[] = [];
  formStatusToFormStatusesForDelete: string[] = [];
  icon = new FileInfo();
  iconId?: string;
  // // @ClassHelper.GetClassConstructor(FormStatusGroup)
  // formStatusGroup = new FormStatusGroup();
  // formStatusGroupId?: string;

  //
  code = '';
  constructor(i?: FormStatus) {
    ClassHelper.BuildClass(this, i);
  }

  isClarified(): boolean {
    return this.name === FormStatusNames.Clarified;
  }

  isAccepted(): boolean {
    return this.name === FormStatusNames.Accepted;
  }

  isConsidering(): boolean {
    return this.name === FormStatusNames.Considering;
  }

  isClarifyRequired(): boolean {
    return this.name === FormStatusNames.ClarifyRequired;
  }

  isCancelled(): boolean {
    return this.name === FormStatusNames.Cancelled;
  }

  isRemoved(): boolean {
    return this.name === FormStatusNames.Removed;
  }

  isNew(): boolean {
    console.log(this.name);
    return this.name === FormStatusNames.New;
  }

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    fileInfos.push(this.icon);
    return fileInfos;
  }

  removeFormStatusToFormStatuses(item: FormStatusToFormStatus): void {
    if (!item.id) {
      return;
    }
    this.formStatusToFormStatusesForDelete.push(item.id);
  }

  static GetClassName(): string {
    return 'formStatus';
  }
}
