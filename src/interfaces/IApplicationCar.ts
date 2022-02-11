import IDivision from '@/interfaces/buildings/IDivision';
import IUser from '@/interfaces/IUser';

export default interface IApplicationCar {
  id?: string;
  carNumber: string;
  carBrand: string;
  divisionId?: string;
  division?: IDivision;
  userId?: string;
  user?: IUser;
  date: Date;
}
