import { v4 as uuidv4 } from 'uuid';

import EducationYear from '@/classes/EducationYear';
import FileInfo from '@/classes/File/FileInfo';
import Form from '@/classes/Form';
import ResidencyApplication from '@/classes/ResidencyApplication';
import ResidencyCourse from '@/classes/ResidencyCourse';
import ResidencyCourseSpecialization from '@/classes/ResidencyCourseSpecialization';
import ResidencyCourseTeacher from '@/classes/ResidencyCourseTeacher';
import Teacher from '@/classes/Teacher';
import IResidencyCourse from '@/interfaces/IResidencyCourse';

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

    expect(residencyCourse.residencyCoursesTeachers[0].main).toBe(false);
    expect(residencyCourse.residencyCoursesTeachers[1].main).toBe(false);
    expect(residencyCourse.residencyCoursesTeachers[2].main).toBe(false);

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
    residencyCourse.setMainTeacher(-1);

    // Assert
    expect(residencyCourse.residencyCoursesTeachers[NaN]).toBeUndefined();
    expect(residencyCourse.residencyCoursesTeachers[3]).toBeUndefined();
    expect(residencyCourse.residencyCoursesTeachers[-1]).toBeUndefined();
  });
});
