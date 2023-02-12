export default class PostgraduateCourseDates {
  id?: string;
  start = new Date();
  end = new Date();

  constructor(i?: PostgraduateCourseDates) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.start = i.start;
    this.end = i.end;
  }
}
