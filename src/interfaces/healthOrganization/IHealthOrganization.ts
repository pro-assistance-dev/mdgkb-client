import IGeolocation from '@/interfaces/IGeolocation';
import ITimeTable from '@/interfaces/ITimeTable';
import IPhone from '@/interfaces/IPhone';

export default interface IHealthOrganization {
  id?: number;
  status?: string;
  // sort?: null;
  // created_by?: 1;
  created_at?: string;
  // updated_by?: 1;
  updated_at?: string;
  name?: string;
  phones?: IPhone[];
  timetable?: ITimeTable[];
  address?: string;
  website?: string;
  geolocation?: IGeolocation;
  tags?: string;
}
