import IHealthOrganization from '@/interfaces/healthOrganization/IHealthOrganization';
import IGeolocation from '@/interfaces/IGeolocation';
import ITimeTable from '@/interfaces/ITimeTable';
import IPhone from '@/interfaces/IPhone';
import Geolocation from '@/classes/Geolocation';
import Phone from '@/classes/Phone';
import TimeTable from '@/classes/TimeTable';

export default class HealthOrganization implements IHealthOrganization {
  id?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
  name?: string;
  phones?: IPhone[] = [];
  timetable?: ITimeTable[] = [];
  address?: string;
  website?: string;
  geolocation?: IGeolocation = new Geolocation();
  tags?: string;

  constructor(healthOrganization?: IHealthOrganization) {
    if (!healthOrganization) {
      return;
    }
    this.id = healthOrganization.id;
    this.status = healthOrganization.status;
    this.created_at = healthOrganization.created_at;
    this.updated_at = healthOrganization.updated_at;
    this.name = healthOrganization.name;
    if (healthOrganization.phones) {
      this.phones = healthOrganization.phones.map((item: IPhone) => new Phone(item));
    }
    if (healthOrganization.timetable) {
      this.timetable = healthOrganization.timetable.map((item: ITimeTable) => new TimeTable(item));
    }
    this.address = healthOrganization.address;
    this.website = healthOrganization.website;
    this.geolocation = new Geolocation(healthOrganization.geolocation);
    this.tags = healthOrganization.tags;
  }
}
