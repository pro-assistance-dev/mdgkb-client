import IExperience from '@/interfaces/IExperience';

export default class Experience implements IExperience {
  id?: string;
  start = 0;
  end = 0;
  place = '';
  position = '';
  doctorId?: string;

  constructor(i?: IExperience) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.start = i.start;
    this.end = i.end;
    this.place = i.place;
    this.position = i.position;
    this.doctorId = i.doctorId;
  }
}
