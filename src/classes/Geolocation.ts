import ClassHelper from '@/services/ClassHelper';

export default class Geolocation {
  lat?: number;
  lng?: number;

  constructor(i?: Geolocation) {
    ClassHelper.BuildClass(this, i);
  }
}
