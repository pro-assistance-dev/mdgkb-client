import { v4 as uuidv4 } from 'uuid';

import EducationYear from '@/classes/EducationYear';
import FileInfo from '@/classes/File/FileInfo';
import Form from '@/classes/Form';
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCourse from '@/classes/ResidencyCourse';
import ResidencyCourseSpecialization from '@/classes/ResidencyCourseSpecialization';
import ResidencyCourseTeacher from '@/classes/ResidencyCourseTeacher';
import Specialization from '@/classes/Specialization';
import Teacher from '@/classes/Teacher';
import IResidencyCourse from '@/interfaces/IResidencyCourse';
import PaidProgramLevel from '@/classes/PaidProgramLevel';

describe('Class ResidencyCourse', () => {
  let residencyCourse: IResidencyCourse | undefined;
  let residencyCourseTeacher: ResidencyCourseTeacher | undefined;
  const emptyString = '';

  afterEach(() => {
    residencyCourse = undefined;
    residencyCourseTeacher = undefined;
  });

  test('Конструктор без параметров создаёт объект с пустыми свойствами', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    // Assert
    expect(residencyCourse.id).toBeUndefined();
    expect(residencyCourse.name).toBe(emptyString);
    expect(residencyCourse.slug).toBe(emptyString);
    expect(residencyCourse.description).toBe(emptyString);
    expect(residencyCourse.cost).toBe(0);
    expect(residencyCourse.freePlaces).toBe(0);
    expect(residencyCourse.freeGovernmentPlaces).toBe(0);
    expect(residencyCourse.paidPlaces).toBe(0);
    expect(residencyCourse.residencyCoursesSpecializations).toHaveLength(0);
    expect(residencyCourse.residencyCoursesSpecializationsForDelete).toHaveLength(0);
    expect(residencyCourse.residencyCoursesTeachers).toHaveLength(0);
    expect(residencyCourse.residencyCoursesTeachersForDelete).toHaveLength(0);
    expect(residencyCourse.formPattern).toBeInstanceOf(Form);
    expect(residencyCourse.formPatternId).toBeUndefined();
    expect(residencyCourse.program).toBeInstanceOf(FileInfo);
    expect(residencyCourse.programId).toBeUndefined();
    expect(residencyCourse.annotation).toBeInstanceOf(FileInfo);
    expect(residencyCourse.annotationId).toBeUndefined();
    expect(residencyCourse.schedule).toBeInstanceOf(FileInfo);
    expect(residencyCourse.scheduleId).toBeUndefined();
    expect(residencyCourse.startYear).toBeInstanceOf(EducationYear);
    expect(residencyCourse.startYearId).toBeUndefined();
    expect(residencyCourse.endYear).toBeInstanceOf(EducationYear);
    expect(residencyCourse.endYearId).toBeUndefined();
    expect(residencyCourse.residencyApplications).toHaveLength(0);
  });

  test('Конструктор корректно заполняет свойства объекта', () => {
    // Arrange
    const item = new ResidencyCourse();
    item.id = '06950b91-62bf-4183-8a4f-2756dacaf32c';
    item.slug = 'Slug';
    item.name = 'Имя';
    item.description = 'Описание';
    item.cost = 100;
    item.freePlaces = 100;
    item.freeGovernmentPlaces = 100;
    item.paidPlaces = 100;
    item.residencyCoursesSpecializations = [new ResidencyCourseSpecialization()];
    item.residencyCoursesTeachers = [new ResidencyCourseTeacher(), new ResidencyCourseTeacher()];
    item.formPattern = new Form();
    item.formPatternId = '16950b91-62bf-4183-8a4f-2756dacaf32c';
    item.program = new FileInfo();
    item.programId = '26950b91-62bf-4183-8a4f-2756dacaf32c';
    item.annotation = new FileInfo();
    item.annotationId = '36950b91-62bf-4183-8a4f-2756dacaf32c';
    item.plan = new FileInfo();
    item.planId = '46950b91-62bf-4183-8a4f-2756dacaf32c';
    item.schedule = new FileInfo();
    item.scheduleId = '56950b91-62bf-4183-8a4f-2756dacaf32c';

    item.startYear = new EducationYear();
    item.startYearId = '66950b91-62bf-4183-8a4f-2756dacaf32c';

    item.endYear = new EducationYear();
    item.endYearId = '76950b91-62bf-4183-8a4f-2756dacaf32c';
    item.residencyApplications = [new ResidencyApplication(), new ResidencyApplication(), new ResidencyApplication()];

    // Act
    residencyCourse = new ResidencyCourse(item);

    // Assert
    expect(residencyCourse.id).toBe(item.id);
    expect(residencyCourse.name).toBe(item.name);
    expect(residencyCourse.slug).toBe(item.slug);
    expect(residencyCourse.description).toBe(item.description);
    expect(residencyCourse.cost).toBe(item.cost);
    expect(residencyCourse.freePlaces).toBe(item.freePlaces);
    expect(residencyCourse.freeGovernmentPlaces).toBe(item.freeGovernmentPlaces);
    expect(residencyCourse.paidPlaces).toBe(item.paidPlaces);
    expect(residencyCourse.residencyCoursesSpecializations).toHaveLength(item.residencyCoursesSpecializations.length);
    expect(residencyCourse.residencyCoursesSpecializationsForDelete).toHaveLength(item.residencyCoursesSpecializationsForDelete.length);
    expect(residencyCourse.residencyCoursesTeachers).toHaveLength(item.residencyCoursesTeachers.length);
    expect(residencyCourse.residencyCoursesTeachersForDelete).toHaveLength(item.residencyCoursesTeachersForDelete.length);
    expect(residencyCourse.formPattern).toBeInstanceOf(Form);
    expect(residencyCourse.formPatternId).toBe(item.formPatternId);
    expect(residencyCourse.program).toBeInstanceOf(FileInfo);
    expect(residencyCourse.programId).toBe(item.programId);
    expect(residencyCourse.annotation).toBeInstanceOf(FileInfo);
    expect(residencyCourse.annotationId).toBe(item.annotationId);
    expect(residencyCourse.schedule).toBeInstanceOf(FileInfo);
    expect(residencyCourse.scheduleId).toBe(item.scheduleId);
    expect(residencyCourse.startYear).toBeInstanceOf(EducationYear);
    expect(residencyCourse.startYearId).toBe(item.startYearId);
    expect(residencyCourse.endYear).toBeInstanceOf(EducationYear);
    expect(residencyCourse.endYearId).toBe(item.endYearId);
    expect(residencyCourse.residencyApplications).toHaveLength(item.residencyApplications.length);
  });

  test('addTeacher() добавляет одного преподавателя и устанавливает для него внешний ключ', () => {
    // Arrange

    // Act
    residencyCourse = new ResidencyCourse();
    expect(residencyCourse.residencyCoursesTeachers.length).toBe(0);
    const teacherForAdding = new Teacher();
    teacherForAdding.id = uuidv4();
    residencyCourse.addTeacher(teacherForAdding);

    // Assert
    expect(residencyCourse.residencyCoursesTeachers.length).toBe(1);
    expect(residencyCourse.residencyCoursesTeachers[0].teacherId).toBe(teacherForAdding.id);
  });

  test('setMainTeacher() устанавливает преподавателя главным', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    const Teacher = new ResidencyCourseTeacher();
    const Teacher1 = new ResidencyCourseTeacher();
    const Teacher2 = new ResidencyCourseTeacher();

    residencyCourse.residencyCoursesTeachers.push(Teacher, Teacher1, Teacher2);

    // Act
    residencyCourse.setMainTeacher(0);

    // Assert
    expect(residencyCourse.residencyCoursesTeachers[0].main).toBe(true);
    expect(residencyCourse.residencyCoursesTeachers[1].main).toBe(false);
    expect(residencyCourse.residencyCoursesTeachers[2].main).toBe(false);
  });

  test('setMainTeacher() проверка на неожиданные значения', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    const Teacher = new ResidencyCourseTeacher();
    const Teacher1 = new ResidencyCourseTeacher();
    const Teacher2 = new ResidencyCourseTeacher();

    residencyCourse.residencyCoursesTeachers.push(Teacher, Teacher1, Teacher2);

    // Act

    // Assert
    expect(residencyCourse.residencyCoursesTeachers[NaN]).toBeUndefined();
    expect(residencyCourse.residencyCoursesTeachers[3]).toBeUndefined();
    expect(residencyCourse.residencyCoursesTeachers[-1]).toBeUndefined();
  });

  test('getMainTeacher() находит и возвращает главного преподавателя', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    const Teacher = new ResidencyCourseTeacher();
    Teacher.teacher.id = uuidv4();
    const Teacher1 = new ResidencyCourseTeacher();
    Teacher1.teacher.id = uuidv4();
    const Teacher2 = new ResidencyCourseTeacher();
    Teacher2.teacher.id = uuidv4();

    residencyCourse.residencyCoursesTeachers.push(Teacher, Teacher1, Teacher2);
    residencyCourse.residencyCoursesTeachers[1].main = true;

    // Act

    // Assert
    expect(residencyCourse.getMainTeacher()?.id).toEqual(Teacher1.teacher.id);
  });

  test('getMainTeacher() не находит главного преподавателя', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    const Teacher = new ResidencyCourseTeacher();
    Teacher.teacher.id = uuidv4();
    const Teacher1 = new ResidencyCourseTeacher();
    Teacher1.teacher.id = uuidv4();
    const Teacher2 = new ResidencyCourseTeacher();
    Teacher2.teacher.id = uuidv4();

    residencyCourse.residencyCoursesTeachers.push(Teacher, Teacher1, Teacher2);

    // Act

    // Assert
    expect(residencyCourse.getMainTeacher()).toBeUndefined();
  });

  test('addSpecialization() добавляет одну специализацию и устанавливает для неё внешний ключ', () => {
    // Arrange

    // Act
    residencyCourse = new ResidencyCourse();
    expect(residencyCourse.residencyCoursesSpecializations.length).toBe(0);
    const specializationForAdding = new Specialization();
    specializationForAdding.id = uuidv4();
    residencyCourse.addSpecialization(specializationForAdding);

    // Assert
    expect(residencyCourse.residencyCoursesSpecializations.length).toBe(1);
    expect(residencyCourse.residencyCoursesSpecializations[0].specializationId).toBe(specializationForAdding.id);
  });

  test('findSpecialization() ищет специализацию по specializationId', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    const Specialization1 = new ResidencyCourseSpecialization();
    Specialization1.specializationId = uuidv4();

    const Specialization2 = new ResidencyCourseSpecialization();
    Specialization2.specializationId = uuidv4();

    const Specialization3 = new ResidencyCourseSpecialization();
    Specialization3.specializationId = uuidv4();

    residencyCourse.residencyCoursesSpecializations.push(Specialization1, Specialization2);

    // Act

    // Assert
    expect(residencyCourse.findSpecialization(Specialization1.specializationId)).toBe(true);
    expect(residencyCourse.findSpecialization(Specialization2.specializationId)).toBe(true);
    expect(residencyCourse.findSpecialization(Specialization3.specializationId)).toBe(false);
  });




  test('setMainSpecialization() устанавливает основную специализацию', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    const Specialization1 = new ResidencyCourseSpecialization();
    const Specialization2 = new ResidencyCourseSpecialization();
    const Specialization3 = new ResidencyCourseSpecialization();

    residencyCourse.residencyCoursesSpecializations.push(Specialization1, Specialization2, Specialization3 );

    // Act
    residencyCourse.setMainSpecialization(0);

    // Assert
    expect(residencyCourse.residencyCoursesSpecializations[0].main).toBe(true);
    expect(residencyCourse.residencyCoursesSpecializations[1].main).toBe(false);
    expect(residencyCourse.residencyCoursesSpecializations[2].main).toBe(false);
  });
  
  test('setMainSpecialization() проверка на неожиданные значения', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    const Specialization1 = new ResidencyCourseSpecialization();
    const Specialization2 = new ResidencyCourseSpecialization();
    const Specialization3 = new ResidencyCourseSpecialization();

    residencyCourse.residencyCoursesSpecializations.push(Specialization1, Specialization2, Specialization3 );

    // Act

    // Assert
    expect(residencyCourse.residencyCoursesSpecializations[NaN]).toBeUndefined();
    expect(residencyCourse.residencyCoursesSpecializations[3]).toBeUndefined();
    expect(residencyCourse.residencyCoursesSpecializations[-1]).toBeUndefined();
  });

  test('getMainSpecialization() находит и возвращает основную специализацию', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    const Specialization1 = new ResidencyCourseSpecialization();
    Specialization1.specialization.id = uuidv4();
    const Specialization2 = new ResidencyCourseSpecialization();
    Specialization2.specialization.id = uuidv4();
    const Specialization3 = new ResidencyCourseSpecialization();
    Specialization3.specialization.id = uuidv4();

    residencyCourse.residencyCoursesSpecializations.push(Specialization1, Specialization2, Specialization3 );
    residencyCourse.residencyCoursesSpecializations[1].main = true;

    // Act

    // Assert
    expect(residencyCourse.getMainSpecialization().id).toEqual(Specialization2.specialization.id);

  });

  test('getMainSpecialization() не находит основную специализацию в массиве специализаций и возвращает специализацию с индексом [0]', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    const Specialization1 = new ResidencyCourseSpecialization();
    Specialization1.specialization.id = uuidv4();
    const Specialization2 = new ResidencyCourseSpecialization();
    Specialization2.specialization.id = uuidv4();
    const Specialization3 = new ResidencyCourseSpecialization();
    Specialization3.specialization.id = uuidv4();

    residencyCourse.residencyCoursesSpecializations.push(Specialization1, Specialization2, Specialization3 );

    // Act

    // Assert
    expect(residencyCourse.getMainSpecialization().id).toEqual(Specialization1.specialization.id);
  });

  test('getMainSpecialization() не находит массива специализаций', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    // Act

    // Assert
    expect(residencyCourse.getMainSpecialization()).toBeDefined;
    expect(residencyCourse.getMainSpecialization().id).toBeUndefined;
  });

  test('getFileInfos() создает массив FileInfos, добавляет в него значения и возвращает его', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    residencyCourse.program = new FileInfo();
    residencyCourse.program.id = uuidv4();
  
    residencyCourse.annotation = new FileInfo();
    residencyCourse.annotation.id = uuidv4();

    residencyCourse.plan = new FileInfo();
    residencyCourse.plan.id = uuidv4();
  
    residencyCourse.schedule = new FileInfo();
    residencyCourse.schedule.id = uuidv4();

    // Act

    // Assert
    expect(residencyCourse.getFileInfos()[0]).toEqual(residencyCourse.program);
    expect(residencyCourse.getFileInfos()[1]).toEqual(residencyCourse.annotation);
    expect(residencyCourse.getFileInfos()[2]).toEqual(residencyCourse.schedule);
    expect(residencyCourse.getFileInfos()[3]).toEqual(residencyCourse.plan);
  });

    // test('getFileInfos() проверка на возврат не пустого массива', () => {
  //   // Arrange
  //   residencyCourse = new ResidencyCourse();

  //   // Act
  //   console.log(residencyCourse.getFileInfos()[0])
  //   // Assert
  //   expect(residencyCourse.getFileInfos()).toBeDefined;
  //   expect(residencyCourse.getFileInfos()[0].id).toBeUndefined;
  //   expect(residencyCourse.getFileInfos()[1].id).toBeUndefined;
  //   expect(residencyCourse.getFileInfos()[2].id).toBeUndefined;
  //   expect(residencyCourse.getFileInfos()[3].id).toBeUndefined;
  // });


  // test('getFileInfos() проверка на неожиданные значения', () => {
  //   // Arrange
  //   residencyCourse = new ResidencyCourse();

  //   residencyCourse.program = new FileInfo();
  //   residencyCourse.program.id = uuidv4();
  
  //   residencyCourse.annotation = new FileInfo();
  //   residencyCourse.annotation.id = uuidv4();

  //   residencyCourse.plan = new FileInfo();
  //   residencyCourse.plan.id = uuidv4();
  
  //   residencyCourse.schedule = new FileInfo();
  //   residencyCourse.schedule.id = uuidv4();

  //   // Act
  //   // Assert
  //   expect(residencyCourse.getFileInfos()[NaN]).toBeUndefined;
  //   expect(residencyCourse.getFileInfos()[-1]).toBeUndefined;
  //   expect(residencyCourse.getFileInfos()[4]).toBeUndefined;
  // });


  test('getPeriod() возвращает период времени, зная начало и конец временного интервала', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();

    residencyCourse.startYear = new EducationYear();
    residencyCourse.startYear.year = new Date(2011, 0, 1, 0, 0, 0, 0);
    residencyCourse.endYear = new EducationYear();
    residencyCourse.endYear.year = new Date(2012, 0, 1, 0, 0, 0, 0);

    // Act

    // Assert
    expect(residencyCourse.getPeriod()).toEqual(`2011 - 2012`);
  });

  test('getPaidCompetitionIndex() возвращает индекс', () => {
    // Arrange
    residencyCourse = new ResidencyCourse();
    residencyCourse.paidPlaces = 10;
    const ResidencyApplication1 = new ResidencyApplication;
    ResidencyApplication1.paid = true;
    const ResidencyApplication2 = new ResidencyApplication;
    ResidencyApplication2.paid = true;
    const ResidencyApplication3 = new ResidencyApplication;
    ResidencyApplication3.paid = true;

    // Act
    residencyCourse.residencyApplications.push(ResidencyApplication1, ResidencyApplication2, ResidencyApplication3 );
    console.log(residencyCourse.getPaidCompetitionIndex());
    console.log(residencyCourse.getPaidApplications().length);
    console.log(residencyCourse.residencyApplications);
    console.log(residencyCourse.getPaidApplications());
    console.log(residencyCourse.getAcceptedApplications());
    console.log(residencyCourse.getFreeApplications());
    // Assert

  });


  test('getApplicationsByPoint()', () => {
    // Arrange

    // Act

    // Assert

  });

  test('getPaidApplicationsByPoint()', () => {
    // Arrange

    // Act

    // Assert

  });

  test('getAcceptedApplications()', () => {
    // Arrange

    // Act

    // Assert

  });

  test('isThisYear()', () => {
    // Arrange

    // Act

    // Assert

  });

  test('getFreeApplications()', () => {
    // Arrange

    // Act

    // Assert

  });

  test('getPaidApplications()', () => {
    // Arrange

    // Act

    // Assert

  });

  test('getFullName()', () => {
    // Arrange

    // Act

    // Assert

  });

  test('applicationPassCompetition()', () => {
    // Arrange

    // Act

    // Assert

  });

  test('paidAcceptedApplicationsExists()', () => {
    // Arrange

    // Act

    // Assert

  });

  

});
