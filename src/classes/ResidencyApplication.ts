import IFileInfo from '@/interfaces/files/IFileInfo';
import IResidencyApplication from '@/interfaces/IResidencyApplication';

import Form from './Form';
import ResidencyCourse from './ResidencyCourse';

export default class ResidencyApplication implements IResidencyApplication {
  id?: string;
  residencyCourse = new ResidencyCourse();
  residencyCourseId?: string;
  formValue = new Form();
  formValueId?: string;

  constructor(residencyApplication?: IResidencyApplication) {
    if (!residencyApplication) {
      return;
    }
    this.id = residencyApplication.id;
    this.residencyCourseId = residencyApplication.residencyCourseId;
    this.formValueId = residencyApplication.formValueId;
    if (residencyApplication.residencyCourse) {
      this.residencyCourse = new ResidencyCourse(residencyApplication.residencyCourse);
    }
    if (residencyApplication.formValue) {
      this.formValue = new Form(residencyApplication.formValue);
    }
  }

  getFileInfos(): IFileInfo[] {
    return this.formValue.getFieldValuesFileInfos();
  }
}
