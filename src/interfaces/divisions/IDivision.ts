export default interface IDivision {
  id?: number;
  status?: string;
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
  slug?: string;
  timetable?: [];
}
