import EducationYear from '@/classes/EducationYear';
import Employee from '@/classes/Employee';
import Form from '@/classes/Form';
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCoursePracticePlaceGroup from '@/classes/ResidencyCoursePracticePlaceGroup';
import ResidencyCourseSpecialization from '@/classes/ResidencyCourseSpecialization';
import Specialization from '@/classes/Specialization';
import FileInfo from '@/services/classes/FileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class ResidencyCourse {
  id?: string;
  slug = '';
  name = '';
  description = '';
  cost = 0;
  freePlaces = 0;
  freeGovernmentPlaces = 0;
  paidPlaces = 0;
  @ClassHelper.GetClassConstructor(ResidencyCourseSpecialization)
  residencyCoursesSpecializations: ResidencyCourseSpecialization[] = [];
  residencyCoursesSpecializationsForDelete: string[] = [];

  @ClassHelper.GetClassConstructor(Form)
  formPattern: Form = new Form();
  formPatternId?: string;

  program: FileInfo = new FileInfo();
  programId?: string;

  annotation: FileInfo = new FileInfo();
  annotationId?: string;

  plan: FileInfo = new FileInfo();
  planId?: string;

  schedule: FileInfo = new FileInfo();
  scheduleId?: string;

  startYear: EducationYear = new EducationYear();
  startYearId?: string;

  endYear: EducationYear = new EducationYear();
  endYearId?: string;
  // @ClassHelper.GetClassConstructor(ResidencyApplication)
  residencyApplications: ResidencyApplication[] = [];
  @ClassHelper.GetClassConstructor(ResidencyCoursePracticePlaceGroup)
  residencyCoursePracticePlaceGroups: ResidencyCoursePracticePlaceGroup[] = [];
  residencyCoursePracticePlaceGroupsForDelete: string[] = [];

  mainTeacher: Employee = new Employee();
  mainTeacherId?: string;

  constructor(i?: ResidencyCourse) {
    ClassHelper.BuildClass(this, i);
    if (!i) {
      return;
    }
    if (i.residencyApplications && i.residencyApplications.length > 0) {
      this.residencyApplications = i.residencyApplications.map((r: ResidencyApplication) => new ResidencyApplication(r));
    }
  }

  setMainTeacher(teacher: Employee): void {
    this.mainTeacher = new Employee(teacher);
    this.mainTeacherId = teacher.id;
  }

  addSpecialization(specialization: Specialization): void {
    const index = this.residencyCoursesSpecializations.findIndex(
      (i: ResidencyCourseSpecialization) => i.specializationId === specialization.id
    );
    if (index > -1) {
      ClassHelper.RemoveFromClassByIndex(index, this.residencyCoursesSpecializations, this.residencyCoursesSpecializationsForDelete);
      return;
    }
    const residencyCourseSpecialization = new ResidencyCourseSpecialization();
    residencyCourseSpecialization.specialization = new Specialization(specialization);
    residencyCourseSpecialization.specializationId = specialization.id;
    this.residencyCoursesSpecializations.push(residencyCourseSpecialization);
  }

  findSpecialization(id: string): boolean {
    const spec = this.residencyCoursesSpecializations.find((i: ResidencyCourseSpecialization) => i.specializationId === id);
    return !!spec;
  }

  setMainSpecialization(index: number): void {
    if (typeof index !== 'number' || index < 0 || index >= this.residencyCoursesSpecializations.length - 1) {
      return;
    }
    this.residencyCoursesSpecializations.forEach((i: ResidencyCourseSpecialization) => (i.main = false));
    this.residencyCoursesSpecializations[index].main = true;
  }

  getMainSpecialization(): Specialization {
    const spec = this.residencyCoursesSpecializations.find((s: ResidencyCourseSpecialization) => s.main);
    if (spec) {
      return spec.specialization;
    }
    if (this.residencyCoursesSpecializations.length > 0) {
      return this.residencyCoursesSpecializations[0].specialization;
    }
    return new Specialization();
  }

  getFileInfos(): FileInfo[] {
    const fileInfos: FileInfo[] = [];
    if (this.program) {
      fileInfos.push(this.program);
    }
    if (this.annotation) {
      fileInfos.push(this.annotation);
    }
    if (this.schedule) {
      fileInfos.push(this.schedule);
    }
    if (this.plan) {
      fileInfos.push(this.plan);
    }

    return fileInfos;
  }

  getPeriod(): string {
    return `${this.startYear.year.getFullYear()} - ${this.endYear.year.getFullYear()}`;
  }

  getFreeCompetitionIndex(): number {
    const freePlaces = this.freePlaces;
    const applications = this.getFreeApplications().length;
    if (freePlaces === 0 || applications === 0 || freePlaces === applications) {
      return 0;
    }
    const res = (applications / freePlaces).toFixed(2);
    return Number(res);
  }

  getPaidCompetitionIndex(): number {
    const paidPlaces = this.paidPlaces;
    const applications = this.getPaidApplications().length;
    if (paidPlaces === 0 || applications === 0 || paidPlaces === applications) {
      return 0;
    }
    const res = (applications / paidPlaces).toFixed(2);
    return Number(res);
  }

  getApplicationsByPoint(): ResidencyApplication[] {
    return this.sortByPoint(this.getAcceptedApplications());
  }

  sortByPoint(applications: ResidencyApplication[]): ResidencyApplication[] {
    return applications.sort((a: ResidencyApplication, b: ResidencyApplication) => {
      return (
        b.getPointsSum() - a.getPointsSum() ||
        b.pointsEntrance - a.pointsEntrance ||
        b.calculateAchievementsPoints(true) - a.calculateAchievementsPoints(true)
      );
    });
  }

  getPaidApplicationsByPoint(): ResidencyApplication[] {
    return this.sortByPoint(this.getApplicationsByPoint().filter((a: ResidencyApplication) => a.paid));
  }

  getFreeApplicationsByPoint(): ResidencyApplication[] {
    return this.sortByPoint(this.getApplicationsByPoint().filter((a: ResidencyApplication) => !a.paid));
  }

  getFreeApplications(): ResidencyApplication[] {
    return this.getAcceptedApplications().filter((a: ResidencyApplication) => !a.paid);
  }

  getAcceptedApplications(): ResidencyApplication[] {
    return this.residencyApplications.filter((i: ResidencyApplication) => i.formValue.formStatus.isAccepted());
  }

  isThisYear(): boolean {
    return this.startYear.year.getFullYear() === new Date().getFullYear();
  }

  getPaidApplications(): ResidencyApplication[] {
    return this.getAcceptedApplications().filter((a: ResidencyApplication) => a.paid);
  }

  getFullName(): string {
    return `${this.getMainSpecialization().code} ${this.getMainSpecialization().name}`;
  }

  applicationPassCompetition(placeOfApplication: number): boolean {
    return placeOfApplication <= this.paidPlaces;
  }

  paidAcceptedApplicationsExists(): boolean {
    return this.residencyApplications.some((a) => a.paid && a.formValue.formStatus.isAccepted());
  }

  getInfoFiles(): FileInfo[] {
    const annotaion = new FileInfo(this.annotation);
    annotaion.originalName = 'Аннотация';
    const plan = new FileInfo(this.plan);
    plan.originalName = 'План обучения';
    const program = new FileInfo(this.program);
    program.originalName = 'Программа';
    const schedule = new FileInfo(this.schedule);
    schedule.originalName = 'Расписание';
    return [annotaion, plan, program, schedule].filter((f: FileInfo) => f.fileSystemPath);
  }

  resetMainTeacher(): void {
    this.mainTeacher = new Employee();
    this.mainTeacherId = undefined;
  }

  addPracticePlaceGroup(): void {
    const newItem = new ResidencyCoursePracticePlaceGroup();
    newItem.order = this.residencyCoursePracticePlaceGroups.length;
    this.residencyCoursePracticePlaceGroups.push(newItem);
  }

  static GetClassName(): string {
    return 'residencyCourse';
  }
}
