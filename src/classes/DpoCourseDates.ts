export default class DpoCourseDates {
  id?: string;
  start = new Date();
  end = new Date();

  constructor(i?: DpoCourseDates) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.start = i.start;
    this.end = i.end;
  }
}
