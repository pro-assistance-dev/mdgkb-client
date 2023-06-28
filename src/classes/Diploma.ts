import ClassHelper from '@/services/ClassHelper';

export default class Diploma {
  id?: string;
  universityName = '';
  universityEndDate = new Date();
  number = '';
  series = '';
  date = new Date();
  specialityCode = '';
  speciality = '';

  constructor(i?: Diploma) {
    ClassHelper.BuildClass(this, i);
  }

  getSeriesAndNumber(): string {
    return `${this.series} ${this.number}`;
  }
}
