import IDivision from '@/interfaces/buildings/IDivision';
import IPaidService from '@/interfaces/IPaidService';

export default interface IDivisionPaidService {
  id?: string;
  division?: IDivision;
  divisionId?: string;
  paidService?: IPaidService;
  paidServiceId?: string;
}
