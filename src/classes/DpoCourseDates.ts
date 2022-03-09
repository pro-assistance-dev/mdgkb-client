import IDpoCourseDates from '@/interfaces/IDpoCourseDates';

export default class DpoCourseDates implements IDpoCourseDates {
  id?: string;
  start = new Date();
  end = new Date();

  constructor(i?: IDpoCourseDates) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.start = i.start;
    this.end = i.end;
  }
}
