import IPostgraduateCourseDates from '@/interfaces/IPostgraduateCourseDates';

export default class PostgraduateCourseDates implements IPostgraduateCourseDates {
  id?: string;
  start = new Date();
  end = new Date();

  constructor(i?: IPostgraduateCourseDates) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.start = i.start;
    this.end = i.end;
  }
}
