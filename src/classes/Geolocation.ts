import IGeolocation from '@/interfaces/IGeolocation';

export default class Geolocation implements IGeolocation {
  lat?: number;
  lng?: number;

  constructor(geolocation?: IGeolocation) {
    if (!geolocation) {
      return;
    }
    this.lat = geolocation.lat;
    this.lng = geolocation.lng;
  }
}
