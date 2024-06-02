import DailyMenuOrder from '@/classes/DailyMenuOrder';
import Field from '@/classes/Field';
import FieldValueFile from '@/classes/FieldValueFile';
import FileInfo from '@/services/classes/FileInfo.ts';
import FormStatusToFormStatus from '@/classes/FormStatusToFormStatus';
import FormValueFile from '@/classes/FormValueFile';
import PostgraduateApplication from '@/classes/PostgraduateApplication';
import ResidencyApplicationPointsAchievement from '@/classes/ResidencyApplicationPointsAchievement';
import ClassHelper from '@/services/ClassHelper';

import Child from './Child';
import DpoApplication from './DpoApplication';
import FieldValue from './FieldValue';
import FormStatus from './FormStatus';
import FormStatusGroup from './FormStatusGroup';
import ResidencyApplication from './ResidencyApplication';
import User from './User';
import VacancyResponse from './VacancyResponse';
import VisitsApplication from './VisitsApplication';

export default class Form {
  id?: string;
  title?: string;
  modComment?: string;
  name = '';
  emailNotify = false;
  description = '';
  code = '';
  withApprovingDate = false;
  approvingDate?: Date;

  postgraduateApplication?: PostgraduateApplication;
  @ClassHelper.GetClassConstructor(Field)
  fields: Field[] = [];
  fieldsForDelete: string[] = [];
  fieldValues: FieldValue[] = [];
  fieldValuesForDelete: string[] = [];
  validated = true;
  isNew = true;
  viewedByUser = false;
  createdAt: Date = new Date();
  user = new User();
  @ClassHelper.GetClassConstructor(FormStatus)
  formStatus = new FormStatus();
  @ClassHelper.GetClassConstructor(DpoApplication)
  dpoApplication?: DpoApplication;
  defaultFormStatus?: FormStatus;
  defaultFormStatusId?: string;
  @ClassHelper.GetClassConstructor(FormStatusGroup)
  formStatusGroup?: FormStatusGroup;
  formStatusGroupId?: string;
  @ClassHelper.GetClassConstructor(Child)
  child = new Child();
  childId?: string;
  @ClassHelper.GetClassConstructor(FileInfo)
  personalDataAgreement = new FileInfo();
  personalDataAgreementId?: string;
  withPersonalDataAgreement = false;
  agreedWithPersonalDataAgreement = false;
  showPersonalDataAgreementError = false;
  // changed = false;

  @ClassHelper.GetClassConstructor(PostgraduateApplication)
  postgraduateApplication?: PostgraduateApplication;
  // @ClassHelper.GetClassConstructor(CandidateApplication)
  // candidateApplication?: CandidateApplication;
  @ClassHelper.GetClassConstructor(ResidencyApplication)
  residencyApplication?: ResidencyApplication;
  @ClassHelper.GetClassConstructor(VisitsApplication)
  visitsApplication?: VisitsApplication;
  @ClassHelper.GetClassConstructor(VacancyResponse)
  vacancyResponse?: VacancyResponse;
  @ClassHelper.GetClassConstructor(DailyMenuOrder)
  dailyMenuOrder?: DailyMenuOrder;
  @ClassHelper.GetClassConstructor(FormValueFile)
  formValueFiles: FormValueFile[] = [];
  formValueFilesForDelete: string[] = [];

  chatId?: string;
  // @ClassHelper.GetClassConstructor(Chat)
  // chat = new Chat();

  constructor(i?: Form) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'formPattern';
  }

  constructorMethod(form?: Form) {
    if (!form) {
      return;
    }
    this.id = form.id;
    this.title = form.title;
    this.modComment = form.modComment;
    if (form.approvingDate) {
      this.approvingDate = new Date(form.approvingDate);
    }
    this.description = form.description;
    if (form.createdAt) {
      this.createdAt = form.createdAt;
    }
    if (form.isNew !== undefined) {
      this.isNew = form.isNew;
    }
    if (form.viewedByUser !== undefined) {
      this.viewedByUser = form.viewedByUser;
    }
    if (form.validated) {
      this.validated = form.validated;
    }
    this.code = form.code;
    if (form.user) {
      this.user = new User(form.user);
    }
    if (form.formStatus) {
      this.formStatus = new FormStatus(form.formStatus);
    }
    if (form.fields) {
      this.fields = form.fields.map((item: Field) => new Field(item));
    }
    if (form.fieldValues) {
      this.fieldValues = form.fieldValues.map((item: FieldValue) => new FieldValue(item));
    }
    if (form.dpoApplication) {
      this.dpoApplication = new DpoApplication(form.dpoApplication);
    }
    if (form.formStatusGroup) {
      this.formStatusGroup = new FormStatusGroup(form.formStatusGroup);
    }
    this.formStatusGroupId = form.formStatusGroupId;
    if (form.defaultFormStatus) {
      this.defaultFormStatus = new FormStatus(form.defaultFormStatus);
    }
    this.defaultFormStatusId = form.defaultFormStatusId;
    if (form.child) {
      this.child = new Child(form.child);
    }
    this.childId = form.childId;
    if (form.personalDataAgreement) {
      this.personalDataAgreement = new FileInfo(form.personalDataAgreement);
    }
    if (form.withPersonalDataAgreement !== undefined) {
      this.withPersonalDataAgreement = form.withPersonalDataAgreement;
    }
    this.personalDataAgreementId = form.personalDataAgreementId;
    if (form.agreedWithPersonalDataAgreement !== undefined) {
      this.agreedWithPersonalDataAgreement = form.agreedWithPersonalDataAgreement;
    }

    if (form.postgraduateApplication) {
      this.postgraduateApplication = new PostgraduateApplication(form.postgraduateApplication);
    }
    // if (form.candidateApplication) {
    //   this.candidateApplication = new CandidateApplication(form.candidateApplication);
    // }
    if (form.residencyApplication) {
      this.residencyApplication = new ResidencyApplication(form.residencyApplication);
    }
    if (form.visitsApplication) {
      this.visitsApplication = new VisitsApplication(form.visitsApplication);
    }
    if (form.vacancyResponse) {
      this.vacancyResponse = new VacancyResponse(form.vacancyResponse);
    }
    if (form.dailyMenuOrder) {
      this.dailyMenuOrder = new DailyMenuOrder(form.dailyMenuOrder);
    }
    if (form.formValueFiles) {
      this.formValueFiles = form.formValueFiles.map((item: FormValueFile) => new FormValueFile(item));
    }
    // if (form.chat) {
    //   this.chat = new Chat(form.chat);
    // }
    this.chatId = form.chatId;
    this.withApprovingDate = form.withApprovingDate;
  }
  reproduceFromPattern(form?: Form) {
    this.constructorMethod(form);
    this.initFieldsValues();
    // this.clearIds();
  }

  addField(field?: Field): void {
    this.fields.push(field ?? new Field());
  }
  removeField(index: number): void {
    const idForDelete = this.fields[index].id;
    if (idForDelete) {
      this.fieldsForDelete.push(idForDelete);
    }
    this.fields.splice(index, 1);
  }
  // For formValue fileinfos
  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    this.fieldValues.forEach((i: FieldValue) => {
      if (i.file) {
        fileInfos.push(i.file);
      }
      if (i.fieldValuesFiles.length > 0) {
        i.fieldValuesFiles.forEach((fvf: FieldValueFile) => fileInfos.push(fvf.fileInfo));
      }
    });
    if (this.residencyApplication) {
      this.residencyApplication.residencyApplicationPointsAchievements.forEach((r: ResidencyApplicationPointsAchievement) => {
        fileInfos.push(r.fileInfo);
      });
    }
    this.formValueFiles.forEach((i: FormValueFile) => {
      if (i.file) {
        fileInfos.push(i.file);
      }
    });
    return fileInfos;
  }
  // For form fileinfos
  getFieldsFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    this.fields.forEach((i: Field) => {
      if (i.file) {
        fileInfos.push(i.file);
      }
    });
    return fileInfos;
  }

  findFieldValue(fieldId: string): FieldValue | undefined {
    return this.fieldValues.find((fieldValue: FieldValue) => fieldId === fieldValue.fieldId);
  }

  getFieldValue(field: Field): string | number | Date | FileInfo | boolean | undefined {
    if (!field.id) {
      return;
    }
    const fieldValue = this.findFieldValue(field.id);
    if (!fieldValue) {
      return;
    }
    if (field.valueType.isString()) {
      return fieldValue.valueString;
    }
    if (field.valueType.isNumber()) {
      return fieldValue.valueNumber;
    }
    if (field.valueType.isDate()) {
      return fieldValue.valueDate;
    }
    if (field.valueType.isFile()) {
      return fieldValue.file;
    }
  }
  initFieldsValues(): void {
    this.fields.forEach((field: Field) => {
      const fieldValue = new FieldValue();
      fieldValue.fieldId = field.id;
      fieldValue.field = new Field(field);
      this.fieldValues.push(fieldValue);
    });
  }

  validate(withoutFiles?: boolean, requiredForCancel?: boolean): void {
    this.validated = true;

    this.fieldValues.forEach((el: FieldValue) => {
      if (withoutFiles && (el.field?.valueType.isFile() || el.field?.valueType.isFiles())) {
        return;
      }

      if (el.field?.required) {
        el.validate();
        if (el.showError) {
          this.validated = false;
        }
      }
      if (requiredForCancel && el.field?.requiredForCancel) {
        el.validate();
        if (el.showError) {
          this.validated = false;
        }
      }
    });
    if (this.withPersonalDataAgreement && !this.agreedWithPersonalDataAgreement) {
      this.showPersonalDataAgreementError = true;
      this.validated = false;
    }
  }

  clearValidate(): void {
    this.validated = true;
    this.fieldValues.forEach((el: FieldValue) => {
      el.showError = false;
    });
  }

  getErrorFields(): FieldValue[] {
    return this.fieldValues.filter((item) => item.showError === true);
  }

  getErrorMessage(): string {
    let errorMessage = '<strong>Проверьте правильность введенных данных:</strong><ul>';
    const errorFields = this.getErrorFields();
    errorFields.forEach((item) => {
      errorMessage += `<li>${item.field?.name}</li>`;
    });
    errorMessage += '</ul>';
    return errorMessage;
  }

  clearIds(): void {
    this.id = undefined;
    this.fields.forEach((el: Field) => {
      el.clearIds();
    });
    this.fieldValues.forEach((el: FieldValue) => {
      el.clearIds();
    });
  }

  removeAllFieldsAndValues(): void {
    this.fields.forEach((el: Field) => {
      if (el.id) {
        this.fieldsForDelete.push(el.id);
      }
    });
    this.fieldValues.forEach((el: FieldValue) => {
      if (el.id) {
        this.fieldValuesForDelete.push(el.id);
      }
    });
    this.fields = [];
    this.fieldValues = [];
  }
  applyFormPatternFields(pattern: Form): void {
    this.fields = pattern.fields.map((el: Field) => {
      el.formId = undefined;
      el.fileId = undefined;
      // const fieldValue = new FieldValue();
      // fieldValue.fieldId = el.id;
      // fieldValue.field = new Field(el);
      // this.fieldValues.push(fieldValue);
      return el;
    });
  }
  isFieldValuesModChecked(): boolean {
    return this.fieldValues.every((el) => el.modChecked === true);
  }
  haveModComments(): boolean {
    return this.fieldValues.some((el) => el.modComment);
  }
  changeFieldValuesModChecked(modChecked: boolean): void {
    this.fieldValues.forEach((el: FieldValue) => {
      el.modChecked = modChecked;
      el.modComment = '';
    });
  }
  // setNewStatus(statuses: FormStatus[]): void {
  //   statuses.forEach((el: FormStatus) => {
  //     if (el.isNew()) {
  //       this.formStatus = new FormStatus(el);
  //     }
  //   });
  // }
  setCpecifyStatus(statuses: FormStatus[]): void {
    statuses.forEach((el: FormStatus) => {
      if (el.isClarified()) {
        this.formStatus = new FormStatus(el);
      }
    });
  }
  setCanceledStatus(statuses: FormStatus[]): void {
    statuses.forEach((el: FormStatus) => {
      if (el.isCancelled()) {
        this.formStatus = new FormStatus(el);
      }
    });
  }
  setStatus(status: FormStatus, statuses: FormStatus[]): void {
    const newStatus = statuses.find((el: FormStatus) => el.id === status.id);
    this.formStatus = new FormStatus(newStatus);
    if (this.formStatus.isAccepted() && !this.approvingDate) {
      this.approvingDate = new Date();
    }
    // this.emailNotify = true;
  }
  getFieldsWithModComemnts(): Field[] {
    return this.fields.filter((el: Field) => {
      if (!el.id) {
        return;
      }
      return this.findFieldValue(el.id)?.modComment && !this.findFieldValue(el.id)?.modChecked;
    });
  }
  updateViewedByUser(initialStatus: FormStatus): void {
    if (initialStatus && initialStatus.id !== this.formStatus.id) {
      this.viewedByUser = false;
    }
  }
  // static ApplyFormPattern(pattern: Form): Form {
  //   const form = new Form(pattern);
  //   form.id = undefined;
  //   form.fields.forEach((el: Field) => {
  // el.id = undefined;
  //     el.formId = undefined;
  //     el.fileId = undefined;
  //   });
  //   return form;
  // }

  getApplicationType(): string {
    if (this.dpoApplication) {
      return this.dpoApplication.nmoCourse.isNmo ? 'НМО' : 'ДПО';
    }
    if (this.residencyApplication) {
      return 'Ординатура';
    }
    if (this.postgraduateApplication) {
      return 'Аспирантура';
    }
    // if (this.candidateApplication) {
    //   return 'Кандидатский минимум';
    // }
    if (this.visitsApplication) {
      return 'Заявка на посещение';
    }
    if (this.vacancyResponse) {
      return 'Отклик на вакансию';
    }
    if (this.dailyMenuOrder) {
      return 'Заказ блюд';
    }
    return '';
  }

  getApplicationTypeLink(): string {
    if (this.dpoApplication) {
      return `/dpo?mode=programs`;
    }
    if (this.residencyApplication) {
      return `/residency?mode=programs`;
    }
    if (this.postgraduateApplication) {
      return `/postgraduate?mode=programs`;
    }
    // if (this.candidateApplication) {
    //   return `/postgraduate?mode=candidate`;
    // }
    if (this.visitsApplication) {
      return `/application-car/8ccf8e9b-b487-493e-b451-60b193181f07`;
    }
    if (this.vacancyResponse) {
      return `/vacancies`;
    }
    if (this.dailyMenuOrder) {
      return `/bufet`;
    }
    return '';
  }
  getApplicationName(): string {
    if (this.dpoApplication) {
      return this.dpoApplication.nmoCourse.name;
    }
    if (this.residencyApplication && this.residencyApplication.residencyCourse) {
      return this.residencyApplication.residencyCourse.getMainSpecialization().name;
    }
    if (this.postgraduateApplication) {
      return this.postgraduateApplication.postgraduateCourse.getMainSpecialization().name;
    }
    // if (this.candidateApplication) {
    //   return 'Кандидатский минимум';
    // }
    if (this.visitsApplication) {
      return this.visitsApplication.division?.name;
    }
    // if (this.vacancyResponse?.vacancy) {
    // return this.vacancyResponse.vacancy?.title;
    // }
    if (this.dailyMenuOrder) {
      return `${this.dailyMenuOrder.getFormattedNumber()}: ${this.dailyMenuOrder.getPriceSum()} р.`;
    }
    return '';
  }

  getApplicationNameLink(): string {
    if (this.dpoApplication) {
      return `/courses/${this.dpoApplication.nmoCourse.slug}`;
    }
    if (this.residencyApplication) {
      return `/residency-courses/${this.residencyApplication.residencyCourse?.id}`;
    }
    if (this.postgraduateApplication) {
      return `/postgraduate-courses/${this.postgraduateApplication.postgraduateCourse?.getMainSpecialization().slug}`;
    }
    // if (this.candidateApplication) {
    //   return `/postgraduate?mode=candidate`;
    // }
    if (this.visitsApplication) {
      return `/divisions/${this.visitsApplication.division?.slug}`;
    }
    // if (this.vacancyResponse) {
    // return `/vacancies/${this.vacancyResponse.vacancy?.slug}`;
    // }
    if (this.dailyMenuOrder) {
      return `/bufet`;
    }
    return '';
  }

  getRequiredForCancelFields(): Field[] {
    return this.fields.filter((f: Field) => f.requiredForCancel);
  }

  clearAllFields(): void {
    this.fields = [];
    this.fieldValues.forEach((fv: FieldValue) => (fv.field = new Field()));
  }

  getFieldsByCodes(codes: string[]): Field[] {
    return this.fields.filter((f: Field) => codes.includes(f.code));
  }

  getFieldByCode(code: string): Field | undefined {
    return this.fields.find((f: Field) => f.code === code);
  }

  addForValueFile(): void {
    this.formValueFiles.push(new FormValueFile());
  }

  getFieldValueByCode(code: string): FieldValue | undefined {
    return this.fieldValues.find((fv: FieldValue) => fv.field?.code === code);
  }

  getFieldValueIndexByCode(code: string): number | undefined {
    let index;
    this.fieldValues.forEach((fv: FieldValue, i: number) => {
      if (fv.field?.code === code) {
        index = i;
        return;
      }
    });
    return index;
  }

  getFieldValuesByCodes(codes: string[]): FieldValue[] {
    return this.fieldValues.filter((fv: FieldValue) => {
      if (fv.field?.code) {
        return codes.includes(fv.field?.code);
      }
    });
  }

  setValue(code: string, value: unknown): void {
    const fieldValue = this.getFieldValueByCode(code);
    if (!fieldValue) {
      return;
    }
    switch (typeof value) {
      case 'number':
        fieldValue.valueNumber = value as number;
        break;
      case 'string':
        fieldValue.valueString = value as string;
        break;
    }
  }

  valueExists(code: string): boolean {
    const fieldValue = this.getFieldValueByCode(code);
    return !!fieldValue && !!fieldValue.getValue();
  }

  getUserActions(): FormStatusToFormStatus[] {
    return this.formStatus.formStatusToFormStatuses.filter((f: FormStatusToFormStatus) => f.childFormStatus.userActionName);
  }
}
