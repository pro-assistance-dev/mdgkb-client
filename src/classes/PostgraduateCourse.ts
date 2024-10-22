import FileInfo from '@/services/classes/FileInfo.ts';
import Form from '@/classes/Form';
import PostgraduateCourseDates from '@/classes/PostgraduateCourseDates';
import PostgraduateCoursePlan from '@/classes/PostgraduateCoursePlan';
import PostgraduateCourseSpecialization from '@/classes/PostgraduateCourseSpecialization';
import PostgraduateCourseTeacher from '@/classes/PostgraduateCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import PageSection from '@/services/classes/page/PageSection';
import ClassHelper from '@/services/ClassHelper';
import DateTimeFormatter from '@/services/DateFormat';

export default class PostgraduateCourse {
  id?: string;
  description = '';
  educationForm = 'Очная';
  slug = '';
  cost = 0;
  documentTypeId?: string;
  documentType: PageSection = new PageSection();
  years = 3;
  @ClassHelper.GetClassConstructor(PostgraduateCourseSpecialization)
  postgraduateCoursesSpecializations: PostgraduateCourseSpecialization[] = [];
  postgraduateCoursesSpecializationsForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PostgraduateCourseTeacher)
  postgraduateCoursesTeachers: PostgraduateCourseTeacher[] = [];
  postgraduateCoursesTeachersForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(PostgraduateCourseDates)
  postgraduateCoursesDates: PostgraduateCourseDates[] = [];
  postgraduateCoursesDatesForDelete: string[] = [];
  formPattern: Form = new Form();
  formPatternId?: string;
  questionsFile: FileInfo = new FileInfo();
  questionsFileId?: string;
  programFile: FileInfo = new FileInfo();
  programFileId?: string;
  calendar: FileInfo = new FileInfo();
  calendarId?: string;
  annotation: FileInfo = new FileInfo();
  annotationId?: string;

  postgraduateCoursePlans: PostgraduateCoursePlan[] = [];
  postgraduateCoursePlansForDelete: string[] = [];

  //
  name = '';
  code = '';
  constructor(i?: PostgraduateCourse) {
    ClassHelper.BuildClass(this, i);
  }

  addTeacher(teacher: Teacher): void {
    const postgraduateCourseTeacher = new PostgraduateCourseTeacher();
    postgraduateCourseTeacher.teacher = new Teacher(teacher);
    postgraduateCourseTeacher.teacherId = teacher.id;
    this.postgraduateCoursesTeachers.push(postgraduateCourseTeacher);
  }

  setMainTeacher(index: number): void {
    this.postgraduateCoursesTeachers.forEach((courseTeacher: PostgraduateCourseTeacher) => (courseTeacher.main = false));
    this.postgraduateCoursesTeachers[index].main = true;
  }

  setMainSpecialization(index: number): void {
    this.postgraduateCoursesSpecializations.forEach((i: PostgraduateCourseSpecialization) => (i.main = false));
    this.postgraduateCoursesSpecializations[index].main = true;
  }

  getMainTeacher(): Teacher | undefined {
    const mainPostgraduateCoursesTeacher = this.postgraduateCoursesTeachers.find((item: PostgraduateCourseTeacher) => item.main);
    if (mainPostgraduateCoursesTeacher) {
      return mainPostgraduateCoursesTeacher.teacher;
    }
  }

  addDates(): void {
    this.postgraduateCoursesDates.push(new PostgraduateCourseDates());
  }

  addSpecialization(specialization: Specialization): void {
    const index = this.postgraduateCoursesSpecializations.findIndex(
      (i: PostgraduateCourseSpecialization) => i.specializationId === specialization.id
    );
    if (index > -1) {
      ClassHelper.RemoveFromClassByIndex(index, this.postgraduateCoursesSpecializations, this.postgraduateCoursesSpecializationsForDelete);
      return;
    }
    const postgraduateCourseSpecialization = new PostgraduateCourseSpecialization();
    postgraduateCourseSpecialization.specialization = new Specialization(specialization);
    postgraduateCourseSpecialization.specializationId = specialization.id;
    this.postgraduateCoursesSpecializations.push(postgraduateCourseSpecialization);
  }
  findSpecialization(id: string): boolean {
    const spec = this.postgraduateCoursesSpecializations.find((i: PostgraduateCourseSpecialization) => i.specializationId === id);
    return !!spec;
  }

  getClosestPeriod(): string {
    if (!this.postgraduateCoursesDates[0]) {
      return 'Даты неизвестны';
    }
    return new DateTimeFormatter().getPeriod(this.postgraduateCoursesDates[0].start, this.postgraduateCoursesDates[0].end, {
      year: '2-digit',
    });
  }

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
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
    this.postgraduateCoursePlans.forEach((plan: PostgraduateCoursePlan) => {
      if (plan.plan) {
        fileInfos.push(plan.plan);
      }
    });

    return fileInfos;
  }

  addPostgraduateCoursePlan(): void {
    this.postgraduateCoursePlans.push(new PostgraduateCoursePlan());
  }

  getMainSpecialization(): Specialization {
    const spec = this.postgraduateCoursesSpecializations.find((s: PostgraduateCourseSpecialization) => s.main);
    if (spec) {
      return spec.specialization;
    }
    if (this.postgraduateCoursesSpecializations.length > 0) {
      return this.postgraduateCoursesSpecializations[0].specialization;
    }
    return new Specialization();
  }

  static GetClassName(): string {
    return 'postgraduateCourse';
  }
}
