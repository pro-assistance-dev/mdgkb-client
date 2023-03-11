import ClassHelper from '@/services/ClassHelper';

import ResidencyCourse from './ResidencyCourse';
import ResidencyCoursePracticePlace from './ResidencyCoursePracticePlace';

export default class ResidencyCoursePracticePlaceGroup {
  id?: string;
  name = '';
  link = '';
  order = 0;
  residencyCourse?: ResidencyCourse = new ResidencyCourse();
  residencyCourseId?: string;
  @ClassHelper.GetClassConstructor(ResidencyCoursePracticePlace)
  residencyCoursePracticePlaces: ResidencyCoursePracticePlace[] = [];
  residencyCoursePracticePlacesForDelete: string[] = [];

  constructor(i?: ResidencyCoursePracticePlaceGroup) {
    ClassHelper.BuildClass(this, i);
  }

  addPracticePlace(): void {
    const newItem = new ResidencyCoursePracticePlace();
    newItem.order = this.residencyCoursePracticePlaces.length;
    this.residencyCoursePracticePlaces.push(newItem);
  }
}
