export default interface IDivision {
  // id?: string;
  // name: string;
  // measure: string;
  id?: number;
  status?: string;
  // sort?: null;
  created_by?: string;
  created_at?: string;
  updated_by?: string;
  updated_at?: string;
  name: string;
  info?: string;
  phone?: string;
  email?: string;
  address?: string;
  building_id?: number;
  floor_id?: number;
  // parent?: null;
  slug?: string;
  // root?: null;
  timetable?: [];
}
