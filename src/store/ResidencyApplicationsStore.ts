import Form from '@/classes/Form';
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCourse from '@/classes/ResidencyCourse';
import User from '@/classes/User';
import BaseStore from '@/services/BaseStore';
import HttpClient from '@/services/HttpClientS';

class S extends BaseStore<ResidencyApplication> {
  constructor() {
    super(ResidencyApplication, 'residency-applications');
  }
  async UpdateForm(form: Form): Promise<void> {
    await HttpClient.Put<Form, Form>({
      query: this.getUrl(`form/${form.id}`),
      payload: form,
      fileInfos: form.getFileInfos(),
    });
  }
  async FilledApplicationDownload(item: ResidencyApplication): Promise<void> {
    await HttpClient.Post<ResidencyApplication, ResidencyApplication>({
      payload: item,
      query: this.getUrl(`fill-application-template`),
      isBlob: true,
      downloadFileName: 'Заявление_ординатура_2024.docx',
    });
  }
  SetUser(user: User) {
    this.item.formValue.user = new User(user);
  }
  SetCourse(residencyCourse: ResidencyCourse) {
    this.item.residencyCourse = new ResidencyCourse(residencyCourse);
    this.item.residencyCourseId = this.item.residencyCourse.id;
  }
  SetFormValue(form: Form) {
    this.item.formValue = new Form(form);
  }
  ChangeFormPattern(pattern: Form) {
    this.item.formValue.removeAllFieldsAndValues();
    this.item.formValue.applyFormPatternFields(pattern);
    this.item.formValue.initFieldsValues();
  }
  SetAdmissionCommittee(value: boolean) {
    this.item.admissionCommittee = value;
  }
}

const store: S = new S();
export default store;
