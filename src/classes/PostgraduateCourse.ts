import DocumentType from '@/classes/document/DocumentType';
import FileInfo from '@/classes/File/FileInfo';
import PostgraduateCourseDates from '@/classes/PostgraduateCourseDates';
import PostgraduateCoursePlan from '@/classes/PostgraduateCoursePlan';
import PostgraduateCourseSpecialization from '@/classes/PostgraduateCourseSpecialization';
import PostgraduateCourseTeacher from '@/classes/PostgraduateCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IDocumentType from '@/interfaces/IDocumentType';
import IForm from '@/interfaces/IForm';
import IPostgraduateCourse from '@/interfaces/IPostgraduateCourse';
import IPostgraduateCourseDates from '@/interfaces/IPostgraduateCourseDates';
import IPostgraduateCoursePlan from '@/interfaces/IPostgraduateCoursePlan';
import IPostgraduateCourseSpecialization from '@/interfaces/IPostgraduateCourseSpecialization';
import IPostgraduateCourseTeacher from '@/interfaces/IPostgraduateCourseTeacher';
import ISpecialization from '@/interfaces/ISpecialization';
import ITeacher from '@/interfaces/ITeacher';
import DateTimeFormatter from '@/services/DateFormat';
import removeFromClass from '@/services/removeFromClass';

import Form from './Form';

export default class PostgraduateCourse implements IPostgraduateCourse {
  id?: string;
  description = '';
  educationForm = 'Очная';
  slug = '';
  cost = 0;
  documentTypeId?: string;
  documentType: IDocumentType = new DocumentType();
  years = 3;
  postgraduateCoursesSpecializations: IPostgraduateCourseSpecialization[] = [];
  postgraduateCoursesSpecializationsForDelete: string[] = [];
  postgraduateCoursesTeachers: IPostgraduateCourseTeacher[] = [];
  postgraduateCoursesTeachersForDelete: string[] = [];
  postgraduateCoursesDates: IPostgraduateCourseDates[] = [];
  postgraduateCoursesDatesForDelete: string[] = [];
  formPattern: IForm = new Form();
  formPatternId?: string;
  questionsFile: IFileInfo = new FileInfo();
  questionsFileId?: string;
  programFile: IFileInfo = new FileInfo();
  programFileId?: string;
  calendar: IFileInfo = new FileInfo();
  calendarId?: string;
  annotation: IFileInfo = new FileInfo();
  annotationId?: string;

  postgraduateCoursePlans: IPostgraduateCoursePlan[] = [];
  postgraduateCoursePlansForDelete: string[] = [];

  constructor(i?: IPostgraduateCourse) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.description = i.description;
    this.slug = i.slug;
    this.cost = i.cost;
    this.formPatternId = i.formPatternId;
    this.educationForm = i.educationForm;
    this.years = i.years;
    if (i.postgraduateCoursesDates) {
      this.postgraduateCoursesDates = i.postgraduateCoursesDates.map((item: IPostgraduateCourseDates) => new PostgraduateCourseDates(item));
    }
    if (i.postgraduateCoursesTeachers) {
      this.postgraduateCoursesTeachers = i.postgraduateCoursesTeachers.map(
        (item: IPostgraduateCourseTeacher) => new PostgraduateCourseTeacher(item)
      );
    }
    if (i.postgraduateCoursesSpecializations) {
      this.postgraduateCoursesSpecializations = i.postgraduateCoursesSpecializations.map(
        (item: IPostgraduateCourseSpecialization) => new PostgraduateCourseSpecialization(item)
      );
    }
    if (i.formPattern) {
      this.formPattern = new Form(i.formPattern);
    }
    if (i.questionsFile) {
      this.questionsFile = new FileInfo(i.questionsFile);
    }
    if (i.programFile) {
      this.programFile = new FileInfo(i.programFile);
    }
    if (i.calendar) {
      this.calendar = new FileInfo(i.calendar);
    }
    this.annotationId = i.annotationId;
    if (i.annotation) {
      this.annotation = new FileInfo(i.annotation);
    }
    if (i.postgraduateCoursePlans) {
      this.postgraduateCoursePlans = i.postgraduateCoursePlans.map((item: IPostgraduateCoursePlan) => new PostgraduateCoursePlan(item));
    }
    this.documentTypeId = i.documentTypeId;
    if (i.documentType) {
      this.documentType = new DocumentType(i.documentType);
    }
    this.questionsFileId = i.questionsFileId;
  }

  addTeacher(teacher: ITeacher): void {
    const postgraduateCourseTeacher = new PostgraduateCourseTeacher();
    postgraduateCourseTeacher.teacher = new Teacher(teacher);
    postgraduateCourseTeacher.teacherId = teacher.id;
    this.postgraduateCoursesTeachers.push(postgraduateCourseTeacher);
  }

  setMainTeacher(index: number): void {
    this.postgraduateCoursesTeachers.forEach((courseTeacher: IPostgraduateCourseTeacher) => (courseTeacher.main = false));
    this.postgraduateCoursesTeachers[index].main = true;
  }

  setMainSpecialization(index: number): void {
    this.postgraduateCoursesSpecializations.forEach((i: IPostgraduateCourseSpecialization) => (i.main = false));
    this.postgraduateCoursesSpecializations[index].main = true;
  }

  getMainTeacher(): ITeacher | undefined {
    const mainPostgraduateCoursesTeacher = this.postgraduateCoursesTeachers.find((item: IPostgraduateCourseTeacher) => item.main);
    if (mainPostgraduateCoursesTeacher) {
      return mainPostgraduateCoursesTeacher.teacher;
    }
  }

  addDates(): void {
    this.postgraduateCoursesDates.push(new PostgraduateCourseDates());
  }

  addSpecialization(specialization: ISpecialization): void {
    const index = this.postgraduateCoursesSpecializations.findIndex(
      (i: IPostgraduateCourseSpecialization) => i.specializationId === specialization.id
    );
    if (index > -1) {
      removeFromClass(index, this.postgraduateCoursesSpecializations, this.postgraduateCoursesSpecializationsForDelete);
      return;
    }
    const postgraduateCourseSpecialization = new PostgraduateCourseSpecialization();
    postgraduateCourseSpecialization.specialization = new Specialization(specialization);
    postgraduateCourseSpecialization.specializationId = specialization.id;
    this.postgraduateCoursesSpecializations.push(postgraduateCourseSpecialization);
  }
  findSpecialization(id: string): boolean {
    const spec = this.postgraduateCoursesSpecializations.find((i: IPostgraduateCourseSpecialization) => i.specializationId === id);
    return !!spec;
  }

  getClosestPeriod(): string {
    if (!this.postgraduateCoursesDates[0] || !this.postgraduateCoursesDates[0]) {
      return 'Даты неизвестны';
    }
    return new DateTimeFormatter().getPeriod(this.postgraduateCoursesDates[0].start, this.postgraduateCoursesDates[0].end, {
      year: '2-digit',
    });
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    if (this.questionsFile) {
      fileInfos.push(this.questionsFile);
    }
    if (this.programFile) {
      fileInfos.push(this.programFile);
    }
    if (this.calendar) {
      fileInfos.push(this.calendar);
    }
    if (this.annotation) {
      fileInfos.push(this.annotation);
    }
    this.postgraduateCoursePlans.forEach((plan: IPostgraduateCoursePlan) => {
      if (plan.plan) {
        fileInfos.push(plan.plan);
      }
    });

    return fileInfos;
  }

  addPostgraduateCoursePlan(): void {
    this.postgraduateCoursePlans.push(new PostgraduateCoursePlan());
  }

  getMainSpecialization(): ISpecialization {
    const spec = this.postgraduateCoursesSpecializations.find((s: IPostgraduateCourseSpecialization) => s.main);
    if (spec) {
      return spec.specialization;
    }
    if (this.postgraduateCoursesSpecializations.length > 0) {
      return this.postgraduateCoursesSpecializations[0].specialization;
    }
    return new Specialization();
  }
}
