import IResidencyCoursePracticePlace from '@/interfaces/IResidencyCoursePracticePlace';

export default class ResidencyCoursePracticePlace implements IResidencyCoursePracticePlace {
  id?: string;
  name = '';
  link = '';
  order = 0;

  constructor(i?: IResidencyCoursePracticePlace) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.link = i.link;
    this.order = i.order;
  }
}
