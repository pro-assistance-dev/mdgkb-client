import IDivision from '@/interfaces/divisions/IDivision';

export default class Division implements IDivision {
  id?: number;
  status?: string;
  created_by?: string;
  created_at?: string;
  updated_by?: string;
  updated_at?: string;
  name = '';
  info?: string;
  phone?: string;
  email?: string;
  address?: string;
  building_id?: number;
  floor_id?: number;
  slug?: string;
  timetable?: [];

  constructor(division?: IDivision) {
    if (!division) {
      return;
    }
    this.id = division.id;
    this.status = division.status;
    this.created_by = division.created_by;
    this.created_at = division.created_at;
    this.updated_by = division.updated_by;
    this.updated_at = division.updated_at;
    this.name = division.name;
    this.info = division.info;
    this.phone = division.phone;
    this.email = division.email;
    this.address = division.address;
    this.building_id = division.building_id;
    this.floor_id = division.floor_id;
    this.slug = division.slug;
    this.timetable = division.timetable;
  }
}
